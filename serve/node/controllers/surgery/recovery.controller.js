const { Recovery,Note,NoteType,User, sequelize } = require('../../models');
const { includeRecovery } = require('../includes');

// Create a new Recovery
exports.createRecovery = async (req, res) => {
  try {
    const recovery = await Recovery.create(req.body);
    res.status(201).json(recovery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Recoveries
exports.getAllRecoveries = async (req, res) => {
  try {
    const recoveries = await Recovery.findAll();
    res.json(recoveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a specific Recovery by OrderId along with associated RecoveryObservations
exports.getRecoveryByOrderId = async (req, res) => {
    try {
      const recovery = await Recovery.findOne({
        where: { OrderId: req.params.orderId }, // Adjust if OrderId is in another model
        include: includeRecovery
      });
  
      if (!recovery) {
        return res.status(404).json({ message: 'Recovery not found' });
      }
  
      res.json(recovery);
    } catch (error) {
      console.log("eerror getRecoveryByOrderId recovery controller ", error)
      res.status(500).json({ message: error.message });
    }
  };
  
// Get a specific Recovery by ID
exports.getRecoveryById = async (req, res) => {
  try {
    const recovery = await Recovery.findByPk(req.params.id);
    if (!recovery) {
      return res.status(404).json({ message: 'Recovery not found' });
    }
    res.json(recovery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Recovery by ID
exports.updateRecovery = async (req, res) => {
  try {
    const recovery = await Recovery.findByPk(req.params.id);
    if (!recovery) {
      return res.status(404).json({ message: 'Recovery not found' });
    }
    await recovery.update(req.body);
    res.json(recovery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Recovery by ID
exports.deleteRecovery = async (req, res) => {
  try {
    const recovery = await Recovery.findByPk(req.params.id);
    if (!recovery) {
      return res.status(404).json({ message: 'Recovery not found' });
    }
    await recovery.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Finalizar la Recuperación y crear una observación automática
exports.finalizeRecovery = async (req, res) => {
  const recoveryId = req.params.id;

  const transaction = await sequelize.transaction();

  try {
    // Buscar la recuperación en el contexto de la transacción
    const recovery = await Recovery.findByPk(recoveryId, { transaction });
    if (!recovery) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Recuperación no encontrada' });
    }

    // Actualizar la fecha de fin y el estado de la recuperación
    
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });

    recovery.endDate = req.body.endDate;
    recovery.endTime = req.body.endTime;

    recovery.status = req.body.status;
    await recovery.save({ transaction });

    // Obtener el tipo de nota
    const noteType = await NoteType.findOne({
      where: { name: 'EVOLUCION DE RECUPERACION' },
      transaction
    });

    
    // Buscar el usuario
    const user = await User.findByPk(req.body.UserId, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear la observación de recuperación
    const note = await Note.create({
      note: `El proceso de recuperación ha sido finalizado exitosamente por ${user?.name}. Esta observación fue generada automáticamente.`,
      UserId: req.body.UserId,
      AttentionId: recovery.AttentionId,
      OrderId: recovery.OrderId,
      NoteTypeId: noteType?.id,
      date: date,
      time: time
    }, { transaction });

    // Confirmar la transacción
    await transaction.commit();

    res.status(200).json({
      message: 'Recuperación finalizada exitosamente',
      recovery,
      note,
    });

  } catch (error) {
    await transaction.rollback();
    console.log('Error al finalizar la recuperación:', error);
    res.status(500).json({ message: error.message });
  }
};

  