const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/subTariffManual.controller.js');

router.get('/items/sub-tariff-manual', getItems); // all
router.get('/item/sub-tariff-manual/:id', getItem); // one
router.post('/find/sub-tariff-manual', findItem); // search one
router.post('/sub-tariff-manual', create);
router.put('/sub-tariff-manual/:id', update);
router.delete('/sub-tariff-manual/:id', destroy);
router.get('/sub-tariff-manual/', get); // paginate

module.exports = app => app.use(prefixedRouter);
