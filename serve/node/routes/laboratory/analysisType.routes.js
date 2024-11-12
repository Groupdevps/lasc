const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, find, update, invalidate
  
}  = require( '../../controllers/laboratory/analysisType.controller.js');
//localhost:4000/api/v1/analysis-type


router.get('/analysis-type', get)
router.post('/analysis-type', create);
router.put('/analysis-type/:id', update);
router.get('/analysis-type/:id', find);
router.delete('/analysis-type/:id', invalidate);

module.exports = app => app.use(prefixedRouter);
