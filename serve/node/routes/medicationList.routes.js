const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/medicationList.controller.js');

router.get('/items/medication-list', getItems); // all
router.get('/item/medication-list/:id', getItem); // one
router.post('/find/medication-list', findItem); // search one
router.post('/medication-list', create);
router.put('/medication-list/:id', update);
router.delete('/medication-list/:id', destroy);
router.get('/medication-list/', get); // paginate

module.exports = app => app.use(prefixedRouter);
