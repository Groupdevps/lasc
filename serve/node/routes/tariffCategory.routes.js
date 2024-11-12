const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/tariffCategory.controller.js');

router.get('/items/tariff-category', getItems); // all
router.get('/item/tariff-category/:id', getItem); // one
router.post('/find/tariff-category', findItem); // search one
router.post('/tariff-category', create);
router.put('/tariff-category/:id', update);
router.delete('/tariff-category/:id', destroy);
router.get('/tariff-category/', get); // paginate

module.exports = app => app.use(prefixedRouter);
