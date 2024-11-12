const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/doctor/outpatientOrder.controller.js');

router.get('/items/outpatient-order', getItems); // all
router.get('/item/outpatient-order/:id', getItem); // one
router.post('/find/outpatient-order', findItem); // search one
router.post('/outpatient-order', create);
router.put('/outpatient-order/:id', update);
router.delete('/outpatient-order/:id', destroy);
router.get('/outpatient-order/', get); // paginate

module.exports = app => app.use(prefixedRouter);
