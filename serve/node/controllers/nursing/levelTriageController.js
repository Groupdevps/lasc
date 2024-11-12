// controllers/levelTriageController.js
const { LevelTriage } = require('../../models'); // Ajusta la ruta según tu estructura de archivos
const createLevelTriage = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newLevelTriage = await LevelTriage.create({ name, description });
    res.status(201).json(newLevelTriage);
  } catch (error) {
    console.error('Error creating LevelTriage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLevelTriages = async (req, res) => {
  try {
    const levelTriages = await LevelTriage.findAll();
    res.json(levelTriages);
  } catch (error) {
    console.error('Error getting LevelTriages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLevelTriageById = async (req, res) => {
  const { id } = req.params;
  try {
    const levelTriage = await LevelTriage.findByPk(id);
    if (levelTriage) {
      res.json(levelTriage);
    } else {
      res.status(404).json({ error: 'LevelTriage not found' });
    }
  } catch (error) {
    console.error('Error getting LevelTriage by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateLevelTriage = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedLevelTriage] = await LevelTriage.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount > 0) {
      res.json(updatedLevelTriage[0]);
    } else {
      res.status(404).json({ error: 'LevelTriage not found' });
    }
  } catch (error) {
    console.error('Error updating LevelTriage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteLevelTriage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await LevelTriage.destroy({ where: { id } });
    if (deletedRowsCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'LevelTriage not found' });
    }
  } catch (error) {
    console.error('Error deleting LevelTriage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createLevelTriage,
  getLevelTriages,
  getLevelTriageById,
  updateLevelTriage,
  deleteLevelTriage,
};
