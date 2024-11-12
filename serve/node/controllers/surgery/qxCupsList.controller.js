const { QxCupsList } = require('../../models');

const QxCupsListController = {
  // Crear una nueva entrada de QxCupsList
  async create(req, res) {
    try {
      const { CupsListId, QxId } = req.body;
      const newQxCupsList = await QxCupsList.create({ CupsListId, QxId });
      res.status(201).json(newQxCupsList);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la entrada de QxCupsList' });
    }
  },

  // Obtener todas las entradas de QxCupsList
  async getAll(req, res) {
    try {
      const qxCupsLists = await QxCupsList.findAll();
      res.status(200).json(qxCupsLists);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las entradas de QxCupsList' });
    }
  },

  // Obtener una entrada de QxCupsList por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const qxCupsList = await QxCupsList.findByPk(id);
      if (!qxCupsList) {
        return res.status(404).json({ error: 'Entrada de QxCupsList no encontrada' });
      }
      res.status(200).json(qxCupsList);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la entrada de QxCupsList' });
    }
  },

  // Actualizar una entrada de QxCupsList por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { CupsListId, QxId } = req.body;
      const qxCupsList = await QxCupsList.findByPk(id);
      if (!qxCupsList) {
        return res.status(404).json({ error: 'Entrada de QxCupsList no encontrada' });
      }
      await qxCupsList.update({ CupsListId, QxId });
      res.status(200).json(qxCupsList);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la entrada de QxCupsList' });
    }
  },

  // Eliminar una entrada de QxCupsList por ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const qxCupsList = await QxCupsList.findByPk(id);
      if (!qxCupsList) {
        return res.status(404).json({ error: 'Entrada de QxCupsList no encontrada' });
      }
      await qxCupsList.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la entrada de QxCupsList' });
    }
  }
};

module.exports = QxCupsListController;
