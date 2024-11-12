const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems
  
}  = require ( '../controllers/folder/subTreatment.controller.js');

router.get('/items/sub-treatment', getItems); // all
router.get('/item/sub-treatment/:id', getItem); // one
router.post('/find/sub-treatment', findItem); // search one
router.post('/sub-treatment', create);
router.put('/sub-treatment/:id', update);
router.delete('/sub-treatment/:id', destroy);
router.get('/sub-treatment/', get); // paginate
router.post('/find/all/sub-treatment', findItems); // search by
module.exports = app => app.use(prefixedRouter);
