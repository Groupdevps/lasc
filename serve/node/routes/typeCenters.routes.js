const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getTypeCenters, createTypeCenter
  
}  = require ( '../controllers/typeCenters.controller.js');

router.get('/type-center', getTypeCenters);
router.post('/type-center', createTypeCenter);
router.put('/type-center/:id');
router.delete('/type-center/:id');
router.get('/type-center/:id');

module.exports = app => app.use(prefixedRouter);
