const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, findByState, create, get, update, destroy
  
}  = require ( '../../controllers/cities.controller.js');

router.get('/items/cities', getItems); // all
router.get('/item/cities/:id', getItem); // one
router.get('/find/city/by-state/:state', findByState);
router.post('/find/cities', findItem); // search one
router.post('/cities', create);
router.put('/cities/:id', update);
router.delete('/cities/:id', destroy);
router.get('/cities/', get); // paginate

module.exports = app => app.use(prefixedRouter);
