const recordAnesthesicField = require('../../lib/fields/recordAnesthesicField');
const { AnestheticRecord, Order, User,AnestheticTechnique,Attention } = require('../../models'); // Importa el modelo AnestheticRecord y otros modelos necesarios
const { includeAttentionById } = require('../includes');
const editarPDF = require('../institutionalReports/pdf.lib.controller')

class AnestheticRecordController {
  // Crear un nuevo registro anestésico
  async create(req, res) {
    try {
      const anestheticRecord = await AnestheticRecord.create(req.body);
      return res.status(201).json(anestheticRecord);
    } catch (error) {
      console.error('Error al crear el AnestheticRecord:', error.message);
      return res.status(500).json({ message: 'Error al crear el AnestheticRecord' });
    }
  }

  // Obtener todos los registros anestésicos
  async getAll(req, res) {
    try {
      const {ord} = req.query
      const anestheticRecords = await AnestheticRecord.findAll({
        where: { OrderId: ord},
        include: [
          { model: Order , include : [{model: Attention , as: "Attention", include: includeAttentionById}]},  // Incluir la información de la orden
          { model: AnestheticTechnique },  // Incluir la información de la orden
          { model: User, as: 'anesthesiologist' },  // Incluir la información del anestesiólogo
          { model: User, as: 'surgeon' },  // Incluir la información del cirujano
          { model: User, as: 'creator' }   // Incluir la información del creador
        ]
      });
      return res.status(200).json(anestheticRecords);
    } catch (error) {
      console.error('Error al obtener los AnestheticRecords:', error);
      return res.status(500).json({ message: 'Error al obtener los AnestheticRecords' });
    }
  }

  // Obtener un registro anestésico por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const anestheticRecord = await AnestheticRecord.findByPk(id, {
        include: [
          { model: Order },
          { model: User, as: 'anesthesiologist' },
          { model: User, as: 'surgeon' },
          { model: User, as: 'creator' }
        ]
      });

      if (!anestheticRecord) {
        return res.status(404).json({ message: 'AnestheticRecord no encontrado' });
      }

      return res.status(200).json(anestheticRecord);
    } catch (error) {
      console.error('Error al obtener el AnestheticRecord:', error);
      return res.status(500).json({ message: 'Error al obtener el AnestheticRecord' });
    }
  }

  // Actualizar un registro anestésico
  async update(req, res) {
    const { id } = req.params;
    try {
      const anestheticRecord = await AnestheticRecord.findByPk(id);

      if (!anestheticRecord) {
        return res.status(404).json({ message: 'AnestheticRecord no encontrado' });
      }

      await anestheticRecord.update(req.body);  // Actualizar el registro con los datos del cuerpo de la solicitud
      return res.status(200).json(anestheticRecord);
    } catch (error) {
      console.error('Error al actualizar el AnestheticRecord:', error);
      return res.status(500).json({ message: 'Error al actualizar el AnestheticRecord' });
    }
  }

  // Eliminar un registro anestésico
  async delete(req, res) {
    const { id } = req.params;
    try {
      const anestheticRecord = await AnestheticRecord.findByPk(id);

      if (!anestheticRecord) {
        return res.status(404).json({ message: 'AnestheticRecord no encontrado' });
      }

      await anestheticRecord.destroy();  // Eliminar el registro
      return res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar el AnestheticRecord:', error);
      return res.status(500).json({ message: 'Error al eliminar el AnestheticRecord' });
    }
  }
  async download  (req,res) {
    // Ruta del PDF existente
    const pdfPath = './public/anexos/registro_anestesia.pdf'
    // Datos del JSON
    

    const {id} = req.params
    const jsonData =  await AnestheticRecord.findByPk(id)

    const modifiedPdfBytes = await editarPDF(pdfPath, jsonData, recordAnesthesicField);

    // Configurar el encabezado de la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${id}.pdf`);

     // Enviar el contenido del PDF como respuesta
     res.end(modifiedPdfBytes, 'binary');
  }
}

module.exports = new AnestheticRecordController();
