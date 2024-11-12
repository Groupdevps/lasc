const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create,
  get,
  update,
  download,
  generate
}  = require ( '../../controllers/institutionalReports/furtran.controller.js');
//localhost:4000/api/v1/furip

router.get('/furtran/generate/:AttentionId', generate);
router.post('/furtran', create);
router.get('/furtran/:id', get);
router.put('/furtran/:id', update);
router.get('/furtran/download/:id', download)

module.exports = app => app.use(prefixedRouter);

