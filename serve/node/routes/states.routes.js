const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/states.controller.js');

router.get('/items/states', getItems); // all
router.get('/item/states/:id', getItem); // one
router.post('/find/states', findItem); // search one
router.post('/states', create);
router.put('/states/:id', update);
router.delete('/states/:id', destroy);
router.get('/states/', get); // paginate

module.exports = app => app.use(prefixedRouter);
