const {TypeOrder} = require ( '../../models')

const getAllTypeOrders = async (req, res) => {
    try {
        
        const TypeOrders = await TypeOrder.findAll()
        res.status(200).json(TypeOrders)

    } catch (error) {
        console.error('error getAllTypeOrders, typeOrder.controller.js:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllTypeOrders
}