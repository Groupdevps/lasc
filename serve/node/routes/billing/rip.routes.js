// routes/rips.routes.js
const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const ripsController = require('../../controllers/billing/rip.controller.js');

// Ruta para generar el archivo TXT de RIPS
router.post('/download/rip', ripsController.generateRIPSFile);

// Ruta para obtener los datos de RIPS en formato JSON
router.post('/rips', ripsController.getRIPSData);

module.exports = app => app.use(prefixedRouter);
