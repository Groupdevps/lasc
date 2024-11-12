const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const AnestheticRecordController = require('../../controllers/surgery/anestheticRecord.controller.js');

// Crear un nuevo AnestheticRecord
router.post('/anesthetic-records', AnestheticRecordController.create);

// Obtener todos los AnestheticRecords
router.get('/anesthetic-records', AnestheticRecordController.getAll);

// Obtener un AnestheticRecord por ID
router.get('/anesthetic-records/:id', AnestheticRecordController.getById);

// Actualizar un AnestheticRecord por ID
router.put('/anesthetic-records/:id', AnestheticRecordController.update);

// Eliminar un AnestheticRecord por ID
router.delete('/anesthetic-records/:id', AnestheticRecordController.delete);

router.get('/anesthetic-records/:id/pdf', AnestheticRecordController.download);


module.exports = app => app.use(prefixedRouter);
