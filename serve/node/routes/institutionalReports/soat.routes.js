const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, update,download
  
}  = require ( '../../controllers/institutionalReports/soat.controller.js');
//localhost:4000/api/v1/soat

router.get('/soat/download/:id', download)
router.post('/soat', create);
router.put('/soat/:id', update);
router.get('/soat/:id', get);

module.exports = app => app.use(prefixedRouter);

