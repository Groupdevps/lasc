const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems
  
}  = require ( '../controllers/folder/clinicHistory.controller.js');

router.get('/items/clinic-history', getItems); // all
router.get('/item/clinic-history/:id', getItem); // one
router.post('/find/clinic-history', findItem); // search one
router.post('/find/all/clinic-history', findItems); // search all by numberId
router.post('/clinic-history', create);
router.put('/clinic-history/:id', update);
router.delete('/clinic-history/:id', destroy);
router.get('/clinic-history/', get); // paginate
module.exports = app => app.use(prefixedRouter);
