// const express = require('express');
const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const {
    createDiagnosticAidResult,
    getDiagnosticAidResultById,
    updateDiagnosticAidResultById,
    deleteDiagnosticAidResultById,
    getAllDiagnosticAidResultsByOrder
} = require('../../controllers/diagnosticAid/diagnosticAidResult.controller.js');
const { getDiagnosticAidResultByOrder } = require('../../controllers/diagnosticAid/diagnosticAidResultPdf.controller');


router.get('/diagnostic-aid/:order/pdf', getDiagnosticAidResultByOrder);
// Rutas CRUD
router.post('/diagnostic-aid', createDiagnosticAidResult);
router.get('/diagnostic-aid', getAllDiagnosticAidResultsByOrder);
router.get('/diagnostic-aid/:id', getDiagnosticAidResultById);
router.put('/diagnostic-aid/:id', updateDiagnosticAidResultById);
router.delete('/diagnostic-aid/:id', deleteDiagnosticAidResultById);

module.exports = app => app.use(prefixedRouter);
