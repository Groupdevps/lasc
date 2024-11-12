const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, find, update, invalidate
  
}  = require ( '../../controllers/laboratory/analysis.controller.js');
//localhost:4000/api/v1/analysis


router.get('/analysis', get)
router.post('/analysis', create);
router.put('/analysis/:id', update);
router.get('/analysis/:id', find);
router.delete('/analysis/:id', invalidate);

module.exports = app => app.use(prefixedRouter);
