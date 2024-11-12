const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems,findItems, getItem, create, get, update, destroy,CreateUrgency
  
}  = require ( '../controllers/admission/attentions.controller.js');


router.get('/attentions', getItems);
router.post('/find/attentions', findItems);
router.post('/attention', CreateUrgency);
router.put('/attention/:id', update);
router.delete('/attention/:id', destroy);
router.get('/attention/:id', getItem);

module.exports = app => app.use(prefixedRouter);

