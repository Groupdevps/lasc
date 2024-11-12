const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const remissionController = require('../../controllers/doctor/remission.controller.js');
const remissionPdfController = require('../../controllers/doctor/remissionPdf.controller.js')
//http://localhost:4000/api/v1/remission
//http://localhost:4000/api/v1/remission/:id


// Crear un nuevo alta
router.post('/remission', remissionController.create);

// Obtener todas las altas
router.get('/remission', remissionController.getAll);

// Obtener un alta por ID
router.get('/remission/:id', remissionController.getById);

// Actualizar un alta por ID
router.put('/remission/:id', remissionController.update);

// Eliminar un alta por ID
router.delete('/remission/:id', remissionController.delete);

// Generar pdf por ID
router.get('/remission/:id/pdf', remissionPdfController.generatePDF);


module.exports = app => app.use(prefixedRouter);

