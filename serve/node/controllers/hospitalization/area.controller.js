// controllers/areaController.js
const {Area, Room, Bed, RoomType} = require('../../models');

// Obtener todas las áreas
const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({
      include: [
        {
          model: Room,
          include: [Bed, RoomType]
        }
      ]
    });
    res.status(200).json(areas);
  } catch (error) {
    console.log("error  getAllAreas ", error)
    res.status(500).json({ message: 'Error al obtener las áreas' });
  }
};

// Obtener un área por ID
const getAreaById = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await Area.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el área' });
  }
};

// Crear una nueva área
const createArea = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newArea = await Area.create({ name, description });
    res.status(201).json(newArea);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el área' });
  }
};

// Actualizar un área por ID
const updateArea = async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;
  try {
    const area = await Area.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    area.name = name;
    area.description = description;
    area.isActive = isActive;
    await area.save();
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el área' });
  }
};

// Desactivar un área (isActive: false)
const deactivateArea = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await Area.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    area.isActive = false;
    await area.save();
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el área' });
  }
};

// Eliminar un área por ID
const deleteArea = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await Area.findByPk(id);
    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    await area.destroy();
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el área' });
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deactivateArea,
  deleteArea
};
