const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);
const epicrisisController = require('../../controllers/doctor/epicrisis.controller.js');
const epicrisisPdfController = require('../../controllers/doctor/epicrisisPdf.controller.js');

//http://localhost:4000/api/v1/epicrisis/:AttentionId
//http://localhost:4000/api/v1/epicrisis/:AttentionId/pdf

// Definir la ruta para obtener la epicrisis por número de atención
router.get('/epicrisis/:AttentionId', epicrisisController.getEpicrisis);


// Definir la ruta para generar y mostrar la epicrisis en PDF
router.get('/epicrisis/:AttentionId/pdf', epicrisisPdfController.epicrisisDownload);



module.exports = app => app.use(prefixedRouter);
