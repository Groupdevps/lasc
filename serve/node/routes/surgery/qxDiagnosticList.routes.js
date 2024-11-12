const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const QxDiagnosticListController = require('../../controllers/surgery/qxDiagnosticList.controller.js');


// Crear una nueva entrada de QxDiagnosticList
router.post('/qx-dx', QxDiagnosticListController.create);

// Obtener todas las entradas de QxDiagnosticList
router.get('/qx-dx', QxDiagnosticListController.getAll);

// Obtener una entrada de QxDiagnosticList por ID
router.get('/qx-dx/:id', QxDiagnosticListController.getById);

// Actualizar una entrada de QxDiagnosticList por ID
router.put('/qx-dx/:id', QxDiagnosticListController.update);

// Eliminar una entrada de QxDiagnosticList por ID
router.delete('/qx-dx/:id', QxDiagnosticListController.delete);

module.exports = app => app.use(prefixedRouter);