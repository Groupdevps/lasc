const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, create, get, update, destroy, getFormatItems
  
}  = require ( '../controllers/typeServices.controller.js');

router.get('/items/type-service', getItems);
router.post('/find/type-service', getItem);
router.post('/type-service', create);
router.put('/type-service/:id', update);
router.delete('/type-service/:id', destroy);
router.get('/type-service/:id', get);

module.exports = app => app.use(prefixedRouter);
