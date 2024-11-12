const { Note } = require('../models');
const { includeNote } = require('./includes');

const NoteController = {
  async create(req, res) {
    try {
      const note = await Note.create(req.body);
      return res.status(201).json(note);
    } catch (error) {
      console.log('note',error)
      return res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const { atn, ord, type} = req.query
      const where= {}
      if (!atn && !ord ) { throw new Error ("Se requiere atención u orden")}
      if (atn) where.AttentionId= atn; 
      if (ord) where.OrderId= ord;
      if (type) where.NoteTypeId=type;
      const notes = await Note.findAll({where, include: includeNote});
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(note);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });

      await note.update(req.body);
      return res.status(200).json(note);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });

      await note.destroy();
      return res.status(200).json(note);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  async getNoteToPdf(req, res) {
    try {
      const { atn, ord, type} = req.query
      const where= {}
      if (!atn && !ord ) { throw new Error ("Se requiere atención u orden")}
      if (atn) where.AttentionId= atn; 
      if (ord) where.OrderId= ord;
      if (type) where.NoteTypeId=type;
      const notes = await Note.findAll({where, include: includeNote});
      if (notes) {
        return notes
      }
    } catch (error) {
      console.log('getNoteToPdf note controller', error)
      return res.status(400).json({ message: error.message });
    }
  },
};


module.exports = NoteController;
