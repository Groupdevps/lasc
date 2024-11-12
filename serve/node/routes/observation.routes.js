const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/observation.controller.js');

router.get('/items/observation', getItems); // all
router.get('/item/observation/:id', getItem); // one
router.post('/find/observation', findItem); // search one
router.post('/observation', create);
router.put('/observation/:id', update);
router.delete('/observation/:id', destroy);
router.get('/observation/', get); // paginate

module.exports = app => app.use(prefixedRouter);
