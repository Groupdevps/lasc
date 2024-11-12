const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy,findCode
  
}
  = require ( '../../controllers/billing/cupsList.controller.js');

router.get('/items/cups-list', get); // all
router.get('/item/cups-list/:id', getItem); // one
router.post('/find/cups-list', findItem); // search one
router.post('/cups-list/find-code', findCode); // search one
router.post('/cups-list', create);
router.put('/cups-list/:id', update);
router.delete('/cups-list/:id', destroy);
//router.get('/cups-list/', get); // paginate

module.exports = app => app.use(prefixedRouter);
