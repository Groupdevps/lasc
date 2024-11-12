// controllers/bedController.js
const {Bed} = require('../../models');

// Obtener todas las camas
const getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.findAll();
    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las camas' });
  }
};

// Obtener una cama por ID
const getBedById = async (req, res) => {
  const { id } = req.params;
  try {
    const bed = await Bed.findByPk(id);
    if (!bed) {
      return res.status(404).json({ message: 'Cama no encontrada' });
    }
    res.status(200).json(bed);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cama' });
  }
};

// Crear una nueva cama
const createBed = async (req, res) => {
  const { code, name, description, RoomId, available } = req.body;
  try {
    const newBed = await Bed.create({ code, name, description, RoomId, available });
    res.status(201).json(newBed);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cama' });
  }
};

// Actualizar una cama por ID
const updateBed = async (req, res) => {
  const { id } = req.params;
  const { code, name, description, RoomId, available, isActive } = req.body;
  try {
    const bed = await Bed.findByPk(id);
    if (!bed) {
      return res.status(404).json({ message: 'Cama no encontrada' });
    }
    bed.code = code;
    bed.name = name;
    bed.description = description;
    bed.RoomId = RoomId;
    bed.available = available;
    bed.isActive = isActive;
    await bed.save();
    res.status(200).json(bed);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cama' });
  }
};

// Desactivar una cama (isActive: false)
const deactivateBed = async (req, res) => {
  const { id } = req.params;
  try {
    const bed = await Bed.findByPk(id);
    if (!bed) {
      return res.status(404).json({ message: 'Cama no encontrada' });
    }
    bed.isActive = false;
    await bed.save();
    res.status(200).json(bed);
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar la cama' });
  }
};

// Eliminar una cama por ID
const deleteBed = async (req, res) => {
  const { id } = req.params;
  try {
    const bed = await Bed.findByPk(id);
    if (!bed) {
      return res.status(404).json({ message: 'Cama no encontrada' });
    }
    await bed.destroy();
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cama' });
  }
};

module.exports = {
  getAllBeds,
  getBedById,
  createBed,
  updateBed,
  deactivateBed,
  deleteBed
};
