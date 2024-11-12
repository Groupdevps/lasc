const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, find, update, invalidate,getLaboratoryList
  
}  = require ( '../../controllers/laboratory/analysisLaboratory.controller.js');
//localhost:4000/api/v1/analysis-laboratory


router.get('/analysis-laboratory', get)
router.get('/analysis-laboratory/labs', getLaboratoryList)
router.post('/analysis-laboratory', create);
router.put('/analysis-laboratory/:id', update);
router.get('/analysis-laboratory/:id', find);
router.get('/analysis-laboratory/:id', invalidate);

module.exports = app => app.use(prefixedRouter);
