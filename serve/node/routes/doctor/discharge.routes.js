const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);
const dischargeController = require('../../controllers/doctor/discharge.controller.js');
const dischargePdfController = require('../../controllers/doctor/dischargePdf.controller.js')
//http://localhost:4000/api/v1/discharges
//http://localhost:4000/api/v1/discharges/:id


// Crear un nuevo alta
router.post('/discharges', dischargeController.create);

// Obtener todas las altas
router.get('/discharges', dischargeController.getAll);

// Obtener un alta por ID
router.get('/discharges/:id', dischargeController.getById);

// Actualizar un alta por ID
router.put('/discharges/:id', dischargeController.update);

// Eliminar un alta por ID
router.delete('/discharges/:id', dischargeController.delete);

// Generar pdf por ID
router.get('/discharges/:id/pdf', dischargePdfController.getDischargeByAttention);


module.exports = app => app.use(prefixedRouter);

