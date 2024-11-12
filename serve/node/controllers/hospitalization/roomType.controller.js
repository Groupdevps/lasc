// controllers/roomTypeController.js
const {RoomType} = require('../../models');

// Obtener todos los tipos de habitación
const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.findAll();
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tipos de habitación' });
  }
};

// Obtener un tipo de habitación por ID
const getRoomTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const roomType = await RoomType.findByPk(id);
    if (!roomType) {
      return res.status(404).json({ message: 'Tipo de habitación no encontrado' });
    }
    res.status(200).json(roomType);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tipo de habitación' });
  }
};

// Crear un nuevo tipo de habitación
const createRoomType = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newRoomType = await RoomType.create({ name, description });
    res.status(201).json(newRoomType);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tipo de habitación' });
  }
};

// Actualizar un tipo de habitación por ID
const updateRoomType = async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;
  try {
    const roomType = await RoomType.findByPk(id);
    if (!roomType) {
      return res.status(404).json({ message: 'Tipo de habitación no encontrado' });
    }
    roomType.name = name;
    roomType.description = description;
    roomType.isActive = isActive;
    await roomType.save();
    res.status(200).json(roomType);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el tipo de habitación' });
  }
};

// Desactivar un tipo de habitación (isActive: false)
const deactivateRoomType = async (req, res) => {
  const { id } = req.params;
  try {
    const roomType = await RoomType.findByPk(id);
    if (!roomType) {
      return res.status(404).json({ message: 'Tipo de habitación no encontrado' });
    }
    roomType.isActive = false;
    await roomType.save();
    res.status(200).json(roomType);
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el tipo de habitación' });
  }
};

// Eliminar un tipo de habitación por ID
const deleteRoomType = async (req, res) => {
  const { id } = req.params;
  try {
    const roomType = await RoomType.findByPk(id);
    if (!roomType) {
      return res.status(404).json({ message: 'Tipo de habitación no encontrado' });
    }
    await roomType.destroy();
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tipo de habitación' });
  }
};

module.exports = {
  getAllRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deactivateRoomType,
  deleteRoomType
};
