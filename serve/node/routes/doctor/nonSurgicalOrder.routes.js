const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const nonSurgicalOrderController = require('../../controllers/doctor/nonSurgicalOrder.controller.js');
//http://localhost:4000/api/v1/non-surgical-orders




// Ruta para crear una nueva orden de procedimiento no quirúrgico
router.post('/non-surgical-orders', nonSurgicalOrderController.createNonSurgicalOrder);

// Ruta para obtener detalles de una orden de procedimiento no quirúrgico por ID
router.get('/non-surgical-orders/:id', nonSurgicalOrderController.getNonSurgicalOrder);

// Ruta para actualizar una orden de procedimiento no quirúrgico por ID
router.put('/non-surgical-orders/:id', nonSurgicalOrderController.updateNonSurgicalOrder);

// Ruta para eliminar una orden de procedimiento no quirúrgico por ID
router.delete('/non-surgical-orders/:id', nonSurgicalOrderController.deleteNonSurgicalOrder);

// Ruta para generar un PDF de una orden de procedimiento no quirúrgico por ID
router.get('/non-surgical-orders/:id/pdf', nonSurgicalOrderController.generateNonSurgicalOrderPDF);



module.exports = app => app.use(prefixedRouter);

