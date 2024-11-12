const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/subsupply.controller.js');

router.get('/items/sub-suply', getItems); // all
router.get('/item/sub-suply/:id', getItem); // one
router.post('/find/sub-suply', findItem); // search one
router.post('/sub-suply', create);
router.put('/sub-suply/:id', update);
router.delete('/sub-suply/:id', destroy);
router.get('/sub-suply/', get); // paginate

module.exports = app => app.use(prefixedRouter);
