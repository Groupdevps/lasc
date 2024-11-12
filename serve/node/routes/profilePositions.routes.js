const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/profileposition.controller.js');

router.get('/items/profileposition', getItems); // all
router.get('/item/profileposition/:id', getItem); // one
router.post('/find/profileposition', findItem); // search one
router.post('/profileposition', create);
router.put('/profileposition/:id', update);
router.delete('/profileposition/:id', destroy);
router.get('/profileposition/', get); // paginate

module.exports = app => app.use(prefixedRouter);
