const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const surgeryOrderController = require('../../controllers/surgery/surgeryOrder.controller.js');
// http://localhost:4000/api/v1/surgery-orders
// Crear una nueva orden de cirugía
router.post('/surgery-orders', surgeryOrderController.create);

// Obtener todas las órdenes de cirugía
router.get('/surgery-orders', surgeryOrderController.getAll);


// Obtener una orden de cirugía por ID
router.get('/surgery-orders/:id', surgeryOrderController.getById);

// Generar PDF de una orden de cirugía
router.get('/surgery-orders/:id/pdf', surgeryOrderController.generatePdf);

module.exports = app => app.use(prefixedRouter);
