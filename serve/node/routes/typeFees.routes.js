const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, create, get, update, destroy
  
}  = require ( '../controllers/typeFees.controller.js');

router.get('/typeFees', getItems);
router.post('/findtypeFee', getItem);
router.post('/typeFee', create);
router.put('/typeFee/:id', update);
router.delete('/typeFee/:id', destroy);
router.get('/typeFee/:id', get);

module.exports = app => app.use(prefixedRouter);
