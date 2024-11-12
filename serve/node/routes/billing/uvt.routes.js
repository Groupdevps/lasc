const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
prefixedRouter.use(prefix, router);
const { createUvt, fetchLatestActiveUvt } = require('../../controllers/billing/uvt.controller.js');

// Ruta para crear un nuevo UVT
router.post('/:user/uvt', createUvt);

// Ruta para obtener el UVT activo del año actual
router.get('/uvt/latest', fetchLatestActiveUvt);

module.exports = app => app.use(prefixedRouter);
