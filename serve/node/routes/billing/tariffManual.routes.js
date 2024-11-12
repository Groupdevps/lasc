const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/billing/tariffManual.controller.js');

router.get('/items/tariff-manual', get); // all
router.get('/item/tariff-manual/:id', getItem); // one
router.post('/find/tariff-manual', findItem); // search one
router.post('/tariff-manual', create);
router.put('/tariff-manual/:id', update);
router.delete('/tariff-manual/:id', destroy);
router.get('/tariff-manual/', get); // paginate

module.exports = app => app.use(prefixedRouter);
