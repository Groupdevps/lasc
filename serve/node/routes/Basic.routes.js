const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);

const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/Basic.controller.js');



router.get('/items/basic', getItems); // all
router.get('/item/basic/:id', getItem); // one
router.post('/find/basic', findItem); // search one
router.post('/basic', create);
router.put('/basic/:id', update);
router.delete('/basic/:id', destroy);
router.get('/basic/', get); // paginate

module.exports = app => app.use(prefixedRouter);
