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
}  = require ( '../../controllers/institutionalReports/furip.controller.js');
//localhost:4000/api/v1/furip

router.get('/furips/generate/:AttentionId', generate);
router.post('/furips', create);
router.get('/furips/:id', get);
router.put('/furips/:id', update);
router.get('/furips/download/:id', download)

module.exports = app => app.use(prefixedRouter);

