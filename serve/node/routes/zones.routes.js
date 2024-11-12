const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, create, get, update, destroy
  
}  = require ( '../controllers/zones.controller.js');

router.get('/zone', getItems);
router.post('/item/findZone', getItem);
router.post('/zone', create);
router.put('/zone/:id', update);
router.delete('/zone/:id', destroy);
router.get('/zone/:id', get);

module.exports = app => app.use(prefixedRouter);
