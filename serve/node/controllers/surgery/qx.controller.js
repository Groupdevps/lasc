const { Qx, User, CupsList, DiagnosticList, Attention, Person, sequelize, QxCupsList, QxDiagnosticList } = require('../../models');

// Define the include options as a constant
const qxIncludeOptions = [
  { model: User, as: 'surgeon' },
  { model: User, as: 'anesthesiologist' },
  { model: User, as: 'instrumenter' },
  { model: User, as: 'assistant' },
  { model: User, as: 'creator' },
  { model: Attention, as: 'attention' },
  { model: Person, as: 'person' },
  {
    model: QxCupsList,
    as: 'QxCupsLists',
    include: [CupsList] // el alias que usaste en la relación
  },
  {
    model: QxDiagnosticList,
    as: 'QxDiagnosticLists', // el alias que usaste en la relación
    include: [DiagnosticList]
  },

];

const createQx = async (req, res) => {
  const { QxCupsLists, QxDiagnosticLists } = req.body;

  const transaction = await sequelize.transaction();
  try {
    // Crear Qx principal
    const newQx = await Qx.create(req.body, { transaction });

    // Crear registros de QxCupsList asociados, si existen
    if (QxCupsLists && QxCupsLists.length > 0) {
      for (const item of QxCupsLists) {
        await QxCupsList.create({
          QxId: newQx.id,
          CupsListId: item.CupsListId,
        }, { transaction });
      }
    }

    // Crear registros de QxDiagnosticList asociados, si existen
    if (QxDiagnosticLists && QxDiagnosticLists.length > 0) {
      for (const item of QxDiagnosticLists) {
        await QxDiagnosticList.create({
          QxId: newQx.id,
          DiagnosticListId: item.DiagnosticListId,
        }, { transaction });
      }
    }

    // Recuperar el Qx con sus datos relacionados dentro de la misma transacción
    const qxData = await Qx.findOne({
      where: { id: newQx.id },
      include: qxIncludeOptions,
      transaction
    });
    

    // Confirmar transacción
    await transaction.commit();
    res.status(201).json(qxData);

  } catch (error) {
    // Revertir transacción si algo falla
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const getAllQx = async (req, res) => {
  try {
    
    const qxes = await Qx.findAll({ include: qxIncludeOptions });
    res.status(200).json(qxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQxByOrderId = async (req, res) => {
  try {
    const qx = await Qx.findOne({where: {OrderId: req.query.order}, include: qxIncludeOptions });
    if (qx) {
      res.status(200).json(qx);
    } else {
      res.status(404).json({ error: 'Qx not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQxById = async (req, res) => {
  try {
    const qx = await Qx.findByPk(req.params.id, { include: qxIncludeOptions });
    if (qx) {
      res.status(200).json(qx);
    } else {
      res.status(404).json({ error: 'Qx not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQx = async (req, res) => {
  try {
    const [updated] = await Qx.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedQx = await Qx.findByPk(req.params.id, { include: qxIncludeOptions });
      res.status(200).json(updatedQx);
    } else {
      res.status(404).json({ error: 'Qx not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQx = async (req, res) => {
  try {
    const deleted = await Qx.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Qx not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQx,
  getAllQx,
  getQxById,
  getQxByOrderId,
  updateQx,
  deleteQx,
};
