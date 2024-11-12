const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, create, get, update, destroy
  
}  = require ( '../controllers/status.controller.js');

router.get('/items/status', getItems);
router.post('/findStatus', getItem);
router.post('/status', create);
router.put('/status/:id', update);
router.delete('/status/:id', destroy);
router.get('/status/:id', get);

module.exports = app => app.use(prefixedRouter);
