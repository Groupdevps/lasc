const { Recommendation, Order } = require('../../models');
const { updateStatus } = require('../admission/attentions.controller');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const includeAssociations = [
  { model: Order }
];

// Obtener todas las recomendaciones
const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.findAll({ include: includeAssociations });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una recomendación por ID
const getRecommendationById = async (req, res) => {
  const { id } = req.params;
  try {
    const recommendation = await Recommendation.findByPk(id, { include: includeAssociations });
    if (recommendation) {
      res.json(recommendation);
    } else {
      res.status(404).json({ message: 'Recommendation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva recomendación
const createRecommendation = async (req, res) => {
  const { OrderId, recommendation } = req.body;
  try {
    const newRecommendation = await Recommendation.create({
      OrderId,
      recommendation
    });
    await updateStatus("ALTA MEDICA", AttentionId);
    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una recomendación por ID
const updateRecommendation = async (req, res) => {
  const { id } = req.params;
  const { AttentionId, UserId, recommendation, date, EgressDiagnosisId, PersonId } = req.body;
  try {
    const existingRecommendation = await Recommendation.findByPk(id);
    if (existingRecommendation) {
      await existingRecommendation.update({
        OrderId,
        recommendation
      });
      res.json(existingRecommendation);
    } else {
      res.status(404).json({ message: 'Recommendation not found' });
    }
  } catch (error) {
    res.status  (500).json({ error: error.message });
  }
};

// Eliminar una recomendación por ID
const deleteRecommendation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecommendation = await Recommendation.destroy({ where: { id } });
    if (deletedRecommendation) {
      res.json({ message: 'Recommendation deleted successfully' });
    } else {
      res.status(404).json({ message: 'Recommendation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} 
