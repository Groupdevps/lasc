const { Attention, Center,
    Discharge,
    Qx,
    Apply,
    SubSupply,
    Note,
     HistoryPerson,EvolutionNote,diagnosticAidResult, EmergencyMedicalHistory,PhysicalExam,PersonalBackground,ObservationEvolutionNote,HistoryInfoMedicPerson,User,TypeService} = require('../../models');
const { Op } = require('sequelize');

async function getEpicrisis(req, res) {
    try {
        const { AttentionId } = req.params;
        const attention = await Attention.findOne({id:AttentionId, include: [TypeService,
            {
                model: Center,
                include: ['CurrentAdministrator', 'Address']
            },
            {
                model: HistoryPerson,
                include: ['Gender', 'TypeID']
            },
            
            {
                model: EmergencyMedicalHistory,
                include: [PhysicalExam, PersonalBackground, HistoryInfoMedicPerson,User]
            }
        ]})
      
        const healthServices = await Promise.all([
            Note.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(notes => notes.map(note => ({ ...note.toJSON(), type: 'notas' }))),,
            diagnosticAidResult.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(results => results.map(result => ({ ...result.toJSON(), type: 'Ayuda Diagnóstica' }))),
            Discharge.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(discharges => discharges.map(discharge => ({ ...discharge.toJSON(), type: 'Alta' }))),
            Qx.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(qxs => qxs.map(qx => ({ ...qx.toJSON(), type: 'Intervención Quirúrgica' })))
        ]);

        const allHealthServices = healthServices.flat();
         // Obtener las aplicaciones de medicamentos ordenadas por fecha
         const medications = await Apply.findAll({
            where: { AttentionId: AttentionId },
            include: [SubSupply],
            order: [['date', 'ASC'], ['hour', 'ASC']]
        });
        const epicrisis = {
            attention,
            healthServices: allHealthServices,
            medications
        };

        res.json(epicrisis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getEpicrisisToPdf(req, res) {
    try {
        const { AttentionId } = req.params;
        const attention = await Attention.findOne({id:AttentionId,include: [TypeService,
            {
                model: Center,
                include: ['CurrentAdministrator', 'Address']
            },
            {
                model: HistoryPerson,
                include: ['Gender', 'TypeID']
            },
            
            {
                model: EmergencyMedicalHistory,
                include: [PhysicalExam, PersonalBackground, HistoryInfoMedicPerson,User]
            }
        ]})
      
        const healthServices = await Promise.all([
            Note.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(notes => notes.map(note => ({ ...note.toJSON(), type: 'notas' }))),
            diagnosticAidResult.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(results => results.map(result => ({ ...result.toJSON(), type: 'Ayuda Diagnóstica' }))),
            Discharge.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(discharges => discharges.map(discharge => ({ ...discharge.toJSON(), type: 'Alta' }))),
            Qx.findAll({ where: { AttentionId }, order: [['createdAt', 'ASC']] })
                .then(qxs => qxs.map(qx => ({ ...qx.toJSON(), type: 'Intervención Quirúrgica' })))
        ]);

        const allHealthServices = healthServices.flat();
         // Obtener las aplicaciones de medicamentos ordenadas por fecha
         const medications = await Apply.findAll({
            where: { AttentionId: AttentionId },
            include: [SubSupply],
            order: [['date', 'ASC'], ['hour', 'ASC']]
        });
        const epicrisis = {
            attention,
            healthServices: allHealthServices,
            medications
        };

        return epicrisis
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getEpicrisis,
    getEpicrisisToPdf
};

