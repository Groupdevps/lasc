const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/supply.controller.js');

router.get('/items/supply', getItems); // all
router.get('/item/supply/:id', getItem); // one
router.post('/find/supply', findItem); // search one
router.post('/supply', create);
router.put('/supply/:id', update);
router.delete('/supply/:id', destroy);
router.get('/supply/', get); // paginate

module.exports = app => app.use(prefixedRouter);
