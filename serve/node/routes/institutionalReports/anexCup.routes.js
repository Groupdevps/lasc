const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, update, deactivate
  
}  = require ( '../../controllers/institutionalReports/anexCup.controller.js');
//localhost:4000/api/v1/technical-anex-3/:Anex3Id/anex-cup

router.get('/technical-anex-3/:Anex3Id/anex-cup', get);
router.post('/technical-anex-3/:Anex3Id/anex-cup', create);
router.put('/technical-anex-3/:Anex3Id/anex-cup/:id', update);
router.put('/technical-anex-3/:Anex3Id/anex-cup/:id', deactivate);

module.exports = app => app.use(prefixedRouter);

