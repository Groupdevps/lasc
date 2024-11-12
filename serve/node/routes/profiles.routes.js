const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/profile.controller.js');

router.get('/items/profile', getItems); // all
router.get('/item/profile/:id', getItem); // one
router.post('/find/profile', findItem); // search one
router.post('/profile', create);
router.put('/profile/:id', update);
router.delete('/profile/:id', destroy);
router.get('/profile/', get); // paginate

module.exports = app => app.use(prefixedRouter);
