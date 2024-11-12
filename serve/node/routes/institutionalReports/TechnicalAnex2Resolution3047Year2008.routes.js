const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  create, get, update,download
  
}  = require ( '../../controllers/institutionalReports/TechnicalAnex2Resolution3047Year2008.controller.js');
//localhost:4000/api/v1/technical-anex-2

router.get('/technical-anex-2/:AttentionId/:id', download)
router.get('/find/technical-anex-2/:AttentionId', get);
router.post('/technical-anex-2', create);
router.put('/technical-anex-2/:id', update);

module.exports = app => app.use(prefixedRouter);

