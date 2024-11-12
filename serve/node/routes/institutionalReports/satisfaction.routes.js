const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, update,download, generate
  
}  = require ( '../../controllers/institutionalReports/satisfactionCustomer.controller.js');
//localhost:4000/api/v1/care-satisfaction

router.get('/care-satisfaction/attention/:AttentionId', generate)
router.get('/care-satisfaction/download/:id', download)
router.post('/care-satisfaction', create);
router.put('/care-satisfaction/:id', update);
router.get('/care-satisfaction/:id', get);

module.exports = app => app.use(prefixedRouter);

