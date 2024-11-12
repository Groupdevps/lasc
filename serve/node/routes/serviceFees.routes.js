const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, create, get, update, destroy
  
}  = require ( '../controllers/serviceFees.controller.js');

router.get('/serviceFees', getItems);
router.post('/findserviceFee', getItem);
router.post('/serviceFee', create);
router.put('/serviceFee/:id', update);
router.delete('/serviceFee/:id', destroy);
router.get('/serviceFee/:id', get);

module.exports = app => app.use(prefixedRouter);
