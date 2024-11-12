const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/invoiceInformation.controller.js');

router.get('/items/invoice-information', getItems); // all
router.get('/item/invoice-information/:id', getItem); // one
router.post('/find/invoice-information', findItem); // search one
router.post('/invoice-information', create);
router.put('/invoice-information/:id', update);
router.delete('/invoice-information/:id', destroy);
router.get('/invoice-information/', get); // paginate

module.exports = app => app.use(prefixedRouter);
