const { Order,OrderCupsList ,CupsList, diagnosticAidResult,Attention, HistoryPerson } = require('../../models');
const { User } = require('../../models');
const include = ['User',{
    model: Order,
    include: {
        model: OrderCupsList,
        include: [CupsList]
    }
}, {
    model: Attention,
    include: [
        'Center',  'TypeService', 'Status', 'User', 'CAU',
        {
            model : HistoryPerson,
            include: [ 'Companion', 'TypeID', 'Gender']
           
        }
    ]
}]

const createDiagnosticAidResult = async (req, res) => {
    try {
        const { AttentionId, OrderId, cup } = req.body;

        // Verifica si ya existe un resultado con el mismo AttentionId, OrderId y cup
        const existingResult = await diagnosticAidResult.findOne({
            where: { AttentionId, OrderId, cup }
        });

        if (existingResult) {
            // Si ya existe, devuelve el resultado existente
            return res.status(200).json(existingResult);
        }

        // Si no existe, crea uno nuevo
        const newDiagnosticAidResult = await diagnosticAidResult.create(req.body);
        res.status(201).json(newDiagnosticAidResult);
    } catch (error) {
        console.error('Error al crear el resultado de ayuda diagnóstica:', error);
        res.status(500).json({ message : error.message });
    }
};

// Obtener todos los resultados de ayuda diagnóstica
const getAllDiagnosticAidResults = async (req, res) => {
    try {
        const diagnosticAidResults = await diagnosticAidResult.findAll({include});
        res.status(200).json(diagnosticAidResults);
    } catch (error) {
        console.error('Error al obtener los resultados de ayuda diagnóstica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los resultados de ayuda diagnóstica
const getAllDiagnosticAidResultsByOrder = async (req, res) => {
    try {
        const {cup, patient, order,attention} = req.query
        const where = {}
        if(patient){
            where['$Attention.HistoryPerson.numberId$']  = patient
        }
        if(cup){
            where['$Order.OrderCupsLists.CupsList.code$'] = cup
        }
        if(attention){
            where.AttentionId = attention
        } 
        if(order){
            where['$Order.orderNumber$']  = order
        }

        const results = await diagnosticAidResult.findAll({
            where,
            include
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener los resultados de ayuda diagnóstica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getDiagnosticAidResult = async (req, res) => {
    try {
        let where = {}
        const {attention, order, cup} = req.query
        if (attention) {
            where.AttentionId = attention
        }
        if (order) {
            where.OrderId = order
        }
        if (cup) {
            where.cup = cup
        }
        const diagnosticAidResults = await diagnosticAidResult.findOne({
            where,
            include
        });
        return(diagnosticAidResults);
    } catch (error) {
        console.error('Error al obtener los resultados de ayuda diagnóstica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un resultado de ayuda diagnóstica por ID
const getDiagnosticAidResultById = async (req, res) => {
    try {
        const diagnosticAidResult = await diagnosticAidResult.findByPk(req.params.id);
        if (!diagnosticAidResult) {
            return res.status(404).json({ error: 'Resultado de ayuda diagnóstica no encontrado' });
        }
        res.status(200).json(diagnosticAidResult);
    } catch (error) {
        console.error('Error al obtener el resultado de ayuda diagnóstica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar un resultado de ayuda diagnóstica por ID
const updateDiagnosticAidResultById = async (req, res) => {
    try {
        const [updated] = await diagnosticAidResult.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Resultado de ayuda diagnóstica no encontrado' });
        }
        const updatedDiagnosticAidResult = await diagnosticAidResult.findByPk(req.params.id);
        res.status(200).json(updatedDiagnosticAidResult);
    } catch (error) {
        console.error('Error al actualizar el resultado de ayuda diagnóstica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un resultado de ayuda diagnóstica por ID
const deleteDiagnosticAidResultById = async (req, res) => {
    try {
        const deleted = await diagnosticAidResult.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Resultado de ayuda diagnóstica no encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        console.error('Error al eliminar el resultado de ayuda diagnóstica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    createDiagnosticAidResult,
    getAllDiagnosticAidResults,
    getDiagnosticAidResult,
    getDiagnosticAidResultById,
    updateDiagnosticAidResultById,
    deleteDiagnosticAidResultById,
    getAllDiagnosticAidResultsByOrder
};
