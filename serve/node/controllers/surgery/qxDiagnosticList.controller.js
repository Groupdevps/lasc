const { QxDiagnosticList } = require('../../models');

const QxDiagnosticListController = {
  // Crear una nueva entrada de QxDiagnosticList
  async create(req, res) {
    try {
      const { DiagnosticListId, QxId } = req.body;
      const newQxDiagnosticList = await QxDiagnosticList.create({ DiagnosticListId, QxId });
      res.status(201).json(newQxDiagnosticList);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la entrada de QxDiagnosticList' });
    }
  },

  // Obtener todas las entradas de QxDiagnosticList
  async getAll(req, res) {
    try {
      const qxDiagnosticLists = await QxDiagnosticList.findAll();
      res.status(200).json(qxDiagnosticLists);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las entradas de QxDiagnosticList' });
    }
  },

  // Obtener una entrada de QxDiagnosticList por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const qxDiagnosticList = await QxDiagnosticList.findByPk(id);
      if (!qxDiagnosticList) {
        return res.status(404).json({ error: 'Entrada de QxDiagnosticList no encontrada' });
      }
      res.status(200).json(qxDiagnosticList);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la entrada de QxDiagnosticList' });
    }
  },

  // Actualizar una entrada de QxDiagnosticList por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { DiagnosticListId, QxId } = req.body;
      const qxDiagnosticList = await QxDiagnosticList.findByPk(id);
      if (!qxDiagnosticList) {
        return res.status(404).json({ error: 'Entrada de QxDiagnosticList no encontrada' });
      }
      await qxDiagnosticList.update({ DiagnosticListId, QxId });
      res.status(200).json(qxDiagnosticList);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la entrada de QxDiagnosticList' });
    }
  },

  // Eliminar una entrada de QxDiagnosticList por ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const qxDiagnosticList = await QxDiagnosticList.findByPk(id);
      if (!qxDiagnosticList) {
        return res.status(404).json({ error: 'Entrada de QxDiagnosticList no encontrada' });
      }
      await qxDiagnosticList.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la entrada de QxDiagnosticList' });
    }
  }
};

module.exports = QxDiagnosticListController;
