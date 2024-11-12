const { NoteType } = require('../models');

const NoteTypeController = {
  async create(req, res) {
    try {
      const noteType = await NoteType.create(req.body);
      return res.status(201).json(noteType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const noteTypes = await NoteType.findAll();
      return res.status(200).json(noteTypes);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const noteType = await NoteType.findByPk(req.params.id);
      if (!noteType) return res.status(404).json({ message: 'NoteType not found' });
      return res.status(200).json(noteType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const noteType = await NoteType.findByPk(req.params.id);
      if (!noteType) return res.status(404).json({ message: 'NoteType not found' });

      await noteType.update(req.body);
      return res.status(200).json(noteType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const noteType = await NoteType.findByPk(req.params.id);
      if (!noteType) return res.status(404).json({ message: 'NoteType not found' });

      await noteType.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

module.exports = NoteTypeController;
