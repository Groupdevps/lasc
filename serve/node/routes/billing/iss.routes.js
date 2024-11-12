const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getAll
  
}  = require ( '../../controllers/billing/iss.controller.js');

//localhost:4000/api/v1/:user/iss

router.get('/iss', getAll);

module.exports = app => app.use(prefixedRouter);
