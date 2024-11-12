const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create,generate, get, update,download
  
}  = require ( '../../controllers/institutionalReports/anex9.controller.js');
//localhost:4000/api/v1/technical-anex-9


router.get('/technical-anex-9/generate/:AttentionId', generate);
router.get('/technical-anex-9/download/:id', download)
router.post('/technical-anex-9', create);
router.put('/technical-anex-9/:id', update);
router.get('/technical-anex-9/:id', get);

module.exports = app => app.use(prefixedRouter);

