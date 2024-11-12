const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/invoice.controller.js');

router.get('/items/invoice', getItems); // all
router.get('/item/invoice/:id', getItem); // one
router.post('/find/invoice', findItem); // search one
router.post('/invoice', create);
router.put('/invoice/:id', update);
router.delete('/invoice/:id', destroy);
router.get('/invoice/', get); // paginate

module.exports = app => app.use(prefixedRouter);
