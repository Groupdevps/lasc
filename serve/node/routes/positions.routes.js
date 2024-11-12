const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/position.controller.js');

router.get('/items/position', getItems); // all
router.get('/item/position/:id', getItem); // one
router.post('/find/position', findItem); // search one
router.post('/position', create);
router.put('/position/:id', update);
router.delete('/position/:id', destroy);
router.get('/position/', get); // paginate

module.exports = app => app.use(prefixedRouter);
