const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create,generate, get, update,download
  
}  = require ( '../../controllers/institutionalReports/anex3.controller.js');
//localhost:4000/api/v1/technical-anex-3


router.get('/technical-anex-3/generate/:AttentionId', generate);
router.get('/technical-anex-3/download/:id', download)
router.post('/technical-anex-3', create);
router.put('/technical-anex-3/:id', update);
router.get('/technical-anex-3/:id', get);

module.exports = app => app.use(prefixedRouter);

