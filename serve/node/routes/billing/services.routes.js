const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
prefixedRouter.use(prefix, router);
const ServiceController = require('../../controllers/billing/services.controller.js');

// Rutas para el CRUD de servicios
router.get('/services', ServiceController.getAll);         // Obtener todos los servicios
router.get('/services/:id', ServiceController.getById);     // Obtener un servicio por ID
router.post('/services/', ServiceController.create);         // Crear un nuevo servicio
router.put('/services/:id', ServiceController.update);       // Actualizar un servicio por ID
router.delete('/services/:id', ServiceController.delete);    // Eliminar un servicio por ID


module.exports = app => app.use(prefixedRouter);