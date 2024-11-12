const { District, City, sequelize } = require('../../models');
const { Op } = require('sequelize');
const { attributesDistrict } = require('../includes');
//create

const createDistrict = async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { name, CityId } = req.body;

      // Crear el nuevo distrito
      const newDistrict = await District.create(
        { name, CityId, active: true },
        { transaction: t }
      );

      // Confirmar la transacción
      await t.commit();
      return res.status(201).json(newDistrict);
    } catch (error) {
      // Si ocurre un error, revertir la transacción
      await t.rollback();
      return res.status(500).json({ error: 'Error al crear el distrito' });
    }
}

//get
const getDistrictByCity = async (req, res) => {
    try {
        let where = {}
        const { city } = req.query;
        //where opcional
        where.active = true
        if (city) {
            where.Code_city = city
        }
        // Buscar los districts que estén activos y que pertenezcan a una City con el code proporcionado
        const districts = await District.findAll({
          where,
          attributes: attributesDistrict
        });
  
        return res.status(200).json(districts);
      } catch (error) {
        return res.status(500).json('Error al obtener los distritos');
      }
}
//deactive
const deactiveDistrict = async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      // Buscar y desactivar el district
      const district = await District.findByPk(id);
      if (!district) {
        return res.status(404).json('Distrito no encontrado');
      }

      district.active = false;
      await district.save({ transaction: t });

      // Confirmar la transacción
      await t.commit();
      return res.status(200).json({ message: 'Distrito desactivado correctamente' });
    } catch (error) {
      // Si ocurre un error, revertir la transacción
      await t.rollback();
      return res.status(500).json('Error al desactivar el distrito' );
    }
}

//export
module.exports = {
    createDistrict,
    getDistrictByCity,
    deactiveDistrict
}