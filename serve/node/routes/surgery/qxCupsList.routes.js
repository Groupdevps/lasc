const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const QxCupsListController = require('../../controllers/surgery/qxCupsList.controller.js');


// Crear una nueva entrada de QxCupsList
router.post('/qx-cup', QxCupsListController.create);

// Obtener todas las entradas de QxCupsList
router.get('/qx-cup', QxCupsListController.getAll);

// Obtener una entrada de QxCupsList por ID
router.get('/qx-cup/:id', QxCupsListController.getById);

// Actualizar una entrada de QxCupsList por ID
router.put('/qx-cup/:id', QxCupsListController.update);

// Eliminar una entrada de QxCupsList por ID
router.delete('/qx-cup/:id', QxCupsListController.delete);

module.exports = app => app.use(prefixedRouter);