const { AnestheticTechnique } = require('../../models');

const AnestheticTechniqueController = {
  // Crear una nueva técnica de anestesia
  async create(req, res) {
    try {
      const { name } = req.body;
      const newTechnique = await AnestheticTechnique.create({ name });
      res.status(201).json(newTechnique);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la técnica de anestesia' });
    }
  },

  // Obtener todas las técnicas de anestesia
  async getAll(req, res) {
    try {
      const techniques = await AnestheticTechnique.findAll();
      res.status(200).json(techniques);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las técnicas de anestesia' });
    }
  },

  // Obtener una técnica de anestesia por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const technique = await AnestheticTechnique.findByPk(id);
      if (!technique) {
        return res.status(404).json({ error: 'Técnica de anestesia no encontrada' });
      }
      res.status(200).json(technique);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la técnica de anestesia' });
    }
  },

  // Actualizar una técnica de anestesia por ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const technique = await AnestheticTechnique.findByPk(id);
      if (!technique) {
        return res.status(404).json({ error: 'Técnica de anestesia no encontrada' });
      }
      await technique.update({ name });
      res.status(200).json(technique);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la técnica de anestesia' });
    }
  },

  // Eliminar una técnica de anestesia por ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const technique = await AnestheticTechnique.findByPk(id);
      if (!technique) {
        return res.status(404).json({ error: 'Técnica de anestesia no encontrada' });
      }
      await technique.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la técnica de anestesia' });
    }
  }
};

module.exports = AnestheticTechniqueController;
