const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, find, update, invalidate
  
}  = require ( '../../controllers/laboratory/analysisResult.controller.js');
//localhost:4000/api/v1/analysis-result

const { getAnalysisResultsByOrder } = require('../../controllers/laboratory/laboratoryPdf.controller.js');
//localhost:4000/api/v1/order/:orderId/analysis-results
router.get('/order/:orderId/analysis-results', getAnalysisResultsByOrder);

router.get('/analysis-result', get)
router.post('/analysis-result', create);
router.put('/analysis-result/:id', update);
router.get('/analysis-result/:id', find);
router.get('/analysis-result/:id', invalidate);

module.exports = app => app.use(prefixedRouter);
