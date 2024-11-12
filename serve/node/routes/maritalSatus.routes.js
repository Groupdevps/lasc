const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/maritalStatus.controller.js');

router.get('/items/marital-status', getItems); // all
router.get('/item/marital-status/:id', getItem); // one
router.post('/find/marital-status', findItem); // search one
router.post('/marital-status', create);
router.put('/marital-status/:id', update);
router.delete('/marital-status/:id', destroy);
router.get('/marital-status/', get); // paginate

module.exports = app => app.use(prefixedRouter);
