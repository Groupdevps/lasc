const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/qxCode.controller.js');

router.get('/items/qx-code', getItems); // all
router.get('/item/qx-code/:id', getItem); // one
router.post('/find/qx-code', findItem); // search one
router.post('/qx-code', create);
router.put('/qx-code/:id', update);
router.delete('/qx-code/:id', destroy);
router.get('/qx-code/', get); // paginate

module.exports = app => app.use(prefixedRouter);
