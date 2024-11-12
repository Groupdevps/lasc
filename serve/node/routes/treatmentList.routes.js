const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/treatmentList.controller.js');

router.get('/items/treatment-list', getItems); // all
router.get('/item/treatment-list/:id', getItem); // one
router.post('/find/treatment-list', findItem); // search one
router.post('/treatment-list', create);
router.put('/treatment-list/:id', update);
router.delete('/treatment-list/:id', destroy);
router.get('/treatment-list/', get); // paginate

module.exports = app => app.use(prefixedRouter);
