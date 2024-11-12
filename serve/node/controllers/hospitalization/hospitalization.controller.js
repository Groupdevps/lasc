const { Attention, TypeService, sequelize, Sequelize ,UserId, EvolutionNote} = require('../../models'); // Asegúrate de importar tus modelos correctamente
const {updateStatus} = require ('../admission/attentions.controller')
const { Op } = Sequelize;
const includeOptions = ['HistoryPerson', 'TypeService', 'Person', 'Center', 'Status', 'User', 'Triage']
const newHospitalization = async (req, res) => {
  try {
    const { AttentionId, UserId } = req.body;

    // Realiza las búsquedas necesarias
    const [typeService, attention] = await Promise.all([
      TypeService.findOne({ where: { name: 'HOSPITALIZACION' } }),
      Attention.findByPk(AttentionId),
    ]);

    if (!typeService) {
      return res.status(404).json({ error: 'TypeService "HOSPITALIZACION" not found' });
    }

    if (!attention) {
      return res.status(404).json({ error: 'Attention not found' });
    }

    // Actualiza el servicio y guarda la atención
    attention.TypeServiceId = typeService.id;
    await attention.save();

    // Cambia el estado de la atención
    await updateStatus('SIN CAMA ASIGNADA', attention.id);

    // Crea una nota de evolución médica automatizada
    const now = new Date();
    await EvolutionNote.create({
      AttentionId: attention.id,
      UserId: UserId,
      observation: 'Se genera hospitalización de paciente',
      date: now.toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
      hour: now.toTimeString().split(' ')[0], // Hora en formato HH:MM:SS
    });

    return res.status(200).json(attention);
  } catch (error) {
    console.error('Error during hospitalization process:', error);
    return res.status(500).json({ error: 'An error occurred while creating the hospitalization' });
  }
};


const getHospitalizations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate, patientId } = req.query;
    
    // Encuentra el ID del tipo de servicio 'hospitalization'
    const typeService = await TypeService.findOne({ where: { name: 'HOSPITALIZACION' } });

    if (!typeService) {
      return res.status(404).json({ error: 'TypeService "HOSPITALIZACION" not found' });
    }

    const whereConditions = { TypeServiceId: typeService.id };

    if (status) whereConditions.StatusId = status;
    if (patientId) whereConditions.patient = patientId;
    if (startDate && endDate) {
      whereConditions.assignedDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const { count, rows } = await Attention.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit, 10),
      offset: (page - 1) * limit,
      order: [['assignedDate', 'DESC']], // Ordenar por fecha de asignación, por ejemplo
      include: includeOptions
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: parseInt(page, 10),
      itemsPerPage: parseInt(limit, 10),
      data: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching hospitalizations' });
  }
};

module.exports = {
  newHospitalization,
  getHospitalizations
};
