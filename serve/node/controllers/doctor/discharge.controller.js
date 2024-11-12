//egreso
const { Discharge, Attention, Status } = require('../../models');

async function createDischarge(body) {
  return await Discharge.create(body);
}

async function findAttentionById(id) {
  return await Attention.findByPk(id);
}

async function findStatusByName(name) {
  return await Status.findOne({ where: { name } });
}

async function updateAttentionStatus(attention, statusId, egressDate) {
  attention.StatusId = statusId;
  attention.egressDate = egressDate;
  await attention.save();
}

module.exports = {
  // Crear un nuevo alta
  create: async (req, res) => {
    try {
      // Crear el nuevo discharge
      const discharge = await createDischarge(req.body);

      // Buscar la atención asociada
      const attention = await findAttentionById(discharge.AttentionId);

      if (!attention) {
        return res.status(404).json({ error: 'Attention not found' });
      }

      // Obtener el status "Alta Medica"
      const altaMedicaStatus = await findStatusByName('ALTA MEDICA');
      if (!altaMedicaStatus) {
        return res.status(404).json({ error: 'Status "Alta Medica" not found' });
      }

      // Actualizar el StatusId y egressDate de la atención
      await updateAttentionStatus(attention, altaMedicaStatus.id, discharge.createdAt);

      res.status(201).json(discharge);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obtener todas las altas
  getAll: async (req, res) => {
    try {
      const discharges = await Discharge.findAll();
      res.status(200).json(discharges);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obtener un alta por ID
  getById: async (req, res) => {
    try {
      const discharge = await Discharge.findByPk(req.params.id);
      if (!discharge) {
        return res.status(404).json({ error: 'Discharge not found' });
      }
      res.status(200).json(discharge);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar un alta por ID
  update: async (req, res) => {
    try {
      const discharge = await Discharge.findByPk(req.params.id);
      if (!discharge) {
        return res.status(404).json({ error: 'Discharge not found' });
      }
      await discharge.update(req.body);
      res.status(200).json(discharge);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar un alta por ID
  delete: async (req, res) => {
    try {
      const discharge = await Discharge.findByPk(req.params.id);
      if (!discharge) {
        return res.status(404).json({ error: 'Discharge not found' });
      }
      await discharge.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
