const { Agreement, sequelize } = require('../../models'); // Asegúrate de incluir sequelize
const { Op } = require('sequelize');
const paginate = require('../../lib/paginate.js');
const { attributesAgreement, includeAgreement } = require('../includes');

const deactivateExpiredAgreements = async () => {
  // Obtener la fecha actual
  const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Buscar acuerdos cuya fecha final sea menor que hoy
  const agreements = await Agreement.findAll({
    where: {
      finalDate: {
        [Op.lt]: today // Mayor que la fecha actual
      },
      active: true // Solo los que están activos
    }
  });

  // Actualizar cada acuerdo encontrado
  await Promise.all(agreements.map(async (agreement) => {
    await agreement.update({ active: false }); // Desactivar el acuerdo
  }));
};

module.exports = {
  get: async (req, res) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción

    try {
      const pageSize = parseInt(req.query.page, 10) || 1; // Página actual
      const pageLimit = parseInt(req.query.limit, 10) || 30; // Tamaño de la página
      const search = req.query.search || ''; // Texto de búsqueda
      const order = req.query.order || []; // Orden de los resultados
      const searchOptions = ['name', 'administrator'];

      const paginatedResult = await paginate(
        Agreement,
        pageSize,
        pageLimit,
        search,
        order,
        attributesAgreement,
        searchOptions,
        includeAgreement
      );

      // Desactivar acuerdos cuya fecha final ya ha pasado
      await deactivateExpiredAgreements();
      // Confirmar la transacción
      await transaction.commit();

      // Formatear los resultados
      const formattedResults = paginatedResult.rows.map(result => ({
        numberAgreement: result.numberAgreement || "",
        name: result.name || "",
        percent: result.percent || "",
        tariffManualType: result.tariffManualType || "",
        startDate: result.startDate || "",
        finalDate: result.finalDate || "",
        administrator: result.currentAdministrator?.name || "" ,
        active: result.active
      }));

      res.status(200).json({
        ...paginatedResult,
        rows: formattedResults
      });
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción en caso de error
      console.log('Error en get en Agreement', error);
      res.status(500).json({ message: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const currentDate = new Date();
      const transaction = await sequelize.transaction();
      const { nit } = req.query; 

      let where =  {
        active: true,
        startDate: {
          [Op.lte]: currentDate // Fecha de inicio menor o igual a hoy
        },
        finalDate: {
          [Op.gte]: currentDate // Fecha final mayor o igual a hoy
        }
      }
      if (nit) {
        where.administrator = nit
      }

      // Si no hay NIT, devolver todos los acuerdos activos
      const agreements = await Agreement.findAll({
        where,
        attributesAgreement,
        includeAgreement,
        transaction 
      });

      // Desactivar acuerdos cuya fecha final ya ha pasado
      await deactivateExpiredAgreements();
      // Confirmar la transacción
      await transaction.commit();

      // Formatear los resultados
      const formattedResults = agreements.map(result => ({
        name: result.name || "",
        percent: result.percent || "",
        tariffManualType: result.tariffManualType || "",
        active: result.active
      }));

      res.status(200).json(formattedResults);
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción en caso de error
      res.status(404).json({
        message: error.message
      });
    }
  }, // getItems

  getItem: async (req, res) => {
    try {
      const result = await Agreement.findOne({
        where: {
          id: req.params.id
        },
        attributesAgreement,
        includeAgreement
      });

      if (!result) {
        return res.status(404).json({ message: 'Acuerdo no encontrado' });
      }

      res.status(200).json({
        numberAgreement: result.numberAgreement || "",
        name: result.name || "",
        percent: result.percent || "",
        tariffManualType: result.tariffManualType || "",
        startDate: result.startDate || "",
        finalDate: result.finalDate || "",
        administrator: result.currentAdministrator?.name || "" ,
        active: result.active
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, // getItem

  findItem: async (req, res) => {
    try {
      const result = await Agreement.findOne({
        where: {
          id: req.body.id
        }
      });

      if (!result) {
        return res.status(404).json({ message: 'Acuerdo no encontrado' });
      }

      res.status(200).json({
        numberAgreement: result.numberAgreement || "",
        name: result.name || "",
        percent: result.percent || "",
        tariffManualType: result.tariffManualType || "",
        startDate: result.startDate || "",
        finalDate: result.finalDate || "",
        administrator: result.currentAdministrator?.name || "" ,
        active: result.active
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, // find item

  create: async (req, res) => {
    try {
      const result = await Agreement.create(req.body);
      res.status(201).json({
        numberAgreement: result.numberAgreement || "",
        name: result.name || "",
        percent: result.percent || "",
        tariffManualType: result.tariffManualType || "",
        startDate: result.startDate || "",
        finalDate: result.finalDate || "",
        administrator: result.currentAdministrator?.name || "" ,
        active: result.active
      });
    } catch (error) {
      console.log('error', error.message);
      res.status(400).json({ message: error.message });
    }
  }, // create

  update: async (req, res) => {
    try {
      const [updated] = await Agreement.update(req.body, {
        where: {
          id: req.params.id
        }
      });

      if (!updated) {
        return res.status(404).json({ message: 'Acuerdo no encontrado' });
      }

      const updatedAgreement = await Agreement.findOne({ where: { id: req.params.id } });
      res.status(200).json({
        numberAgreement: updatedAgreement.numberAgreement || "",
        name: updatedAgreement.name || "",
        percent: updatedAgreement.percent || "",
        tariffManualType: updatedAgreement.tariffManualType || "",
        startDate: updatedAgreement.startDate || "",
        finalDate: updatedAgreement.finalDate || "",
        administrator: updatedAgreement.currentAdministrator?.name || "" ,
        active: updatedAgreement.active
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }, // update

  destroy: async (req, res) => {
    try {
      const deleted = await Agreement.destroy({
        where: {
          id: req.params.id
        }
      });

      if (!deleted) {
        return res.status(404).json({ message: 'Acuerdo no encontrado' });
      }

      res.status(204).json(); // No content
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, // destroy
};
