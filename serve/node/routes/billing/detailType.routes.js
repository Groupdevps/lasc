const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  get
  
}  = require ( '../../controllers/billing/detailType.controller.js');
//localhost:4000/:user/detail-type

router.get('/detail-type', get)

module.exports = app => app.use(prefixedRouter);
