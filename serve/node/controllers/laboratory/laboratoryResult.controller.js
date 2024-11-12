const { LaboratoryResult, sequelize, AnalysisResult, AnalysisLaboratory, Analysis, AnalysisType, OrderCupsList, CupsList, User, Attention, HistoryPerson, Order, Status } = require('../../models');

const include = [
    'Center', 
    {
        model: Order,
        include: [{
            model: OrderCupsList,
            include: [CupsList]
        }],
        required: true
    }, 
    {
        model: User,
        as: "Doctor"
    }, 
    {
        model: Attention,
        include: [
            'Center', 'TypeService', 'Status', 'User', 'Triage',
            {
                model: HistoryPerson,
                include: ['Companion', 'TypeID', 'Gender']
            }
        ],
        required: true
    }, 
    {
        model: AnalysisResult,
        include: [{
            model: AnalysisLaboratory,
            include: [
                {
                    model: Analysis,
                    include: [AnalysisType],
                    required: true
                },
                CupsList
            ],
            required: true
        }],
        required: true
    }
];

// Crear un tipo de análisis
const create = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        // Crear el LaboratoryResult y los AnalysisResults asociados
        const result = await createLaboratoryResult(req.body, transaction);
        
        // Actualizar el estado del OrderCupsList relacionado
        await updateStatusOrderCupslistLaboratoryResult(req.body.cup, req.body.OrderId);

        // Consultar y actualizar el estado de la orden si todos los OrderCupsLists están finalizados
        await updateStatusOrderLaboratoryRe(req.body.OrderId);

        await transaction.commit();

        res.status(201).json(result);
    } catch (error) {
        await transaction.rollback();
        console.log('Error en create laboratory result controller:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

const get = async (req, res) => {
    try {
        const { cup, patient, order, attention } = req.query;
        const where = {};
        if (patient) where.numberId = patient;
        if (cup) where.cup = cup;
        if (attention) where.AttentionId = attention;
        if (order) where['$Order.orderNumber$'] = order;

        const result = await LaboratoryResult.findAll({ where, include });
        res.status(200).json(result);
    } catch (error) {
        console.log('Error en get laboratory result controller:', error.message);
        res.status(404).json({ message: 'Sin resultados' });
    }
};

const find = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LaboratoryResult.findByPk(id, { include });
        res.status(200).json(result);
    } catch (error) {
        console.log('Error en find laboratory result controller:', error);
        res.status(404).json({ message: 'Sin resultados' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LaboratoryResult.update(req.body, {
            where: { id: id }
        });
        res.status(200).json(result);
    } catch (error) {
        console.log('Error en update laboratory result controller:', error);
        res.status(404).json({ message: 'No se realizó la actualización' });
    }
};

const invalidate = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LaboratoryResult.update({ active: false }, {
            where: { id: id }
        });
        res.status(200).json(result);
    } catch (error) {
        console.log('Error en invalidate laboratory result controller:', error);
        res.status(404).json({ message: 'No se realizó la eliminación' });
    }
};

const print = async (req, res) => {
    try {
        const { order } = req.params;
        const results = await LaboratoryResult.findAll({
            where: { OrderId: order },
            include
        });
        if (results && results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'No se encontraron resultados.' });
        }
        
    } catch (error) {
        console.log('Error en print laboratory result controller:', error);
        res.status(500).json({ message: 'No se pudo imprimir resultado.' });
    }
};
const printPdf = async (req) => {
    try {
        const { order } = req.params;
        const results = await LaboratoryResult.findAll({
            where: { OrderId: order },
            include
        });
        if (results && results.length > 0) {
           return results
        } else {
            return null
        }
        
    } catch (error) {
        console.log('Error en print laboratory result controller:', error);
        return null
    }
};

async function createLaboratoryResult(data, transaction) {
    try {
        const laboratoryResult = await LaboratoryResult.create({
            AttentionId: data.AttentionId,
            numberId: data.numberId,
            UserId: data.UserId,
            CenterId: data.CenterId,
            cup: data.cup,
            OrderId: data.OrderId,
            metodology: data.metodology,
            note: data.note,
            PersonId: data.PersonId
        }, { transaction });

        const analysisResults = data.AnalysisResults.map(analysis => ({
            AnalysisLaboratoryId: analysis.AnalysisLaboratoryId,
            LaboratoryResultId: laboratoryResult.id,
            result: analysis.result
        }));

        await AnalysisResult.bulkCreate(analysisResults, { transaction });

        return laboratoryResult;
    } catch (error) {
        throw error;
    }
}

async function updateStatus(data, newStatus, transaction) {
    try {
        const status = await Status.findOne({ where: { name: newStatus } }, { transaction });

        if (!status) {
            throw new Error(`No se encuentra el estado: ${newStatus}`);
        }

        await data.update({ StatusId: status.id }, { transaction });

        return data;
    } catch (error) {
        throw error;
    }
}

async function updateStatusOrderCupslistLaboratoryResult(cup, order) {
    const transaction = await sequelize.transaction();

    try {
        // Buscar el ID del cup
        const cupList = await CupsList.findOne({ where: { code: cup }, transaction });

        if (!cupList) {
            throw new Error(`CupsList not found for code: ${cup}`);
        }

        // Buscar OrderCupsList con el OrderId y el CupListId
        const orderCupsList = await OrderCupsList.findOne({
            where: { CupsListId: cupList.id, OrderId: order },
            transaction
        });

        if (!orderCupsList) {
            throw new Error(`OrderCupsList not found for OrderId: ${order} and CupsListId: ${cupList.id}`);
        }

        // Cambiar estatus de OrderCupsList a 'FINALIZADO'
        const orderCupsListUpdated = await updateStatus(orderCupsList, "FINALIZADO");

        await transaction.commit();

        return orderCupsListUpdated;
    } catch (error) {
        await transaction.rollback();
        console.error('Error in updateStatusOrderCupslistLaboratoryResult:', error.message);
        throw error;
    }
}


async function updateStatusOrderLaboratoryRe(OrderId) {
    const transaction = await sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: { id: OrderId },
            include: [{
                model: OrderCupsList,
                include: [Status]
            }],
            transaction
        });

        if (!order) {
            throw new Error("Order not found");
        }

        const allFinalized = order.OrderCupsLists.every(orderCupsList =>
            orderCupsList.Status.name === "FINALIZADO"
        );

        let orderUpdated;
        if (allFinalized) {
            orderUpdated = await updateStatus(order, "FINALIZADO", transaction);
        }

        await transaction.commit();

        return orderUpdated;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = { create, get, find, update, invalidate, print, printPdf};
