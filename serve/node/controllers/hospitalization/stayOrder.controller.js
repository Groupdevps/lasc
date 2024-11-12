// controllers/stayOrderController.js
const {StayOrder} = require('../../models');

// Obtener todas las órdenes de estancia
const getAllStayOrders = async (req, res) => {
  try {
    const stayOrders = await StayOrder.findAll();
    res.status(200).json(stayOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes de estancia' });
  }
};

// Obtener una orden de estancia por ID
const getStayOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const stayOrder = await StayOrder.findByPk(id);
    if (!stayOrder) {
      return res.status(404).json({ message: 'Orden de estancia no encontrada' });
    }
    res.status(200).json(stayOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la orden de estancia' });
  }
};

// Crear una nueva orden de estancia
const createStayOrder = async (req, res) => {
  const { AttentionId, PersonId, BedId, ambit } = req.body;
  try {
    const newStayOrder = await StayOrder.create({ AttentionId, PersonId, BedId, ambit });
    res.status(201).json(newStayOrder);
  } catch (error) {
    console.log("stay ordder error ", error)
    res.status(500).json({ message: 'Error al crear la orden de estancia' });
  }
};

// Actualizar una orden de estancia por ID
const updateStayOrder = async (req, res) => {
  const { id } = req.params;
  const { AttentionId, PersonId, BedId, ambit, isActive } = req.body;
  try {
    const stayOrder = await StayOrder.findByPk(id);
    if (!stayOrder) {
      return res.status(404).json({ message: 'Orden de estancia no encontrada' });
    }
    stayOrder.AttentionId = AttentionId;
    stayOrder.PersonId = PersonId;
    stayOrder.BedId = BedId;
    stayOrder.ambit = ambit;
    stayOrder.isActive = isActive;
    await stayOrder.save();
    res.status(200).json(stayOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la orden de estancia' });
  }
};

// Desactivar una orden de estancia (isActive: false)
const deactivateStayOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const stayOrder = await StayOrder.findByPk(id);
    if (!stayOrder) {
      return res.status(404).json({ message: 'Orden de estancia no encontrada' });
    }
    stayOrder.isActive = false;
    await stayOrder.save();
    res.status(200).json(stayOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar la orden de estancia' });
  }
};

// Eliminar una orden de estancia por ID
const deleteStayOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const stayOrder = await StayOrder.findByPk(id);
    if (!stayOrder) {
      return res.status(404).json({ message: 'Orden de estancia no encontrada' });
    }
    await stayOrder.destroy();
    res.status(200).json({message: "OK"});
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden de estancia' });
  }
};

module.exports = {
  getAllStayOrders,
  getStayOrderById,
  createStayOrder,
  updateStayOrder,
  deactivateStayOrder,
  deleteStayOrder
};
