// controllers/roomController.js
const {Room} = require('../../models');

// Obtener todas las habitaciones
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las habitaciones' });
  }
};

// Obtener una habitación por ID
const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la habitación' });
  }
};

// Crear una nueva habitación
const createRoom = async (req, res) => {
  const { name, description, RoomTypeId, AreaId } = req.body;
  try {
    const newRoom = await Room.create({ name, description, RoomTypeId, AreaId });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la habitación' });
  }
};

// Actualizar una habitación por ID
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, description, RoomTypeId, AreaId, isActive } = req.body;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    room.name = name;
    room.description = description;
    room.RoomTypeId = RoomTypeId;
    room.AreaId = AreaId;
    room.isActive = isActive;
    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la habitación' });
  }
};

// Desactivar una habitación (isActive: false)
const deactivateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    room.isActive = false;
    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar la habitación' });
  }
};

// Eliminar una habitación por ID
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    await room.destroy();
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la habitación' });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deactivateRoom,
  deleteRoom
};
