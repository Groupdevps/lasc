const { RecoveryObservation } = require('../../models');

// Create a new RecoveryObservation
exports.createRecoveryObservation = async (req, res) => {
  try {
    const recoveryObservation = await RecoveryObservation.create(req.body);
    res.status(201).json(recoveryObservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all RecoveryObservations
exports.getAllRecoveryObservations = async (req, res) => {
  try {
    const recoveryObservations = await RecoveryObservation.findAll();
    res.json(recoveryObservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific RecoveryObservation by ID
exports.getRecoveryObservationById = async (req, res) => {
  try {
    const recoveryObservation = await RecoveryObservation.findByPk(req.params.id);
    if (!recoveryObservation) {
      return res.status(404).json({ error: 'RecoveryObservation not found' });
    }
    res.json(recoveryObservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a RecoveryObservation by ID
exports.updateRecoveryObservation = async (req, res) => {
  try {
    const recoveryObservation = await RecoveryObservation.findByPk(req.params.id);
    if (!recoveryObservation) {
      return res.status(404).json({ error: 'RecoveryObservation not found' });
    }
    await recoveryObservation.update(req.body);
    res.json(recoveryObservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a RecoveryObservation by ID
exports.deleteRecoveryObservation = async (req, res) => {
  try {
    const recoveryObservation = await RecoveryObservation.findByPk(req.params.id);
    if (!recoveryObservation) {
      return res.status(404).json({ error: 'RecoveryObservation not found' });
    }
    await recoveryObservation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
