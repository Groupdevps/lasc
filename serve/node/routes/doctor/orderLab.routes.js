const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems,
  agenda
}  = require ( '../../controllers/doctor/orderLab.controller.js');
//const agenda = require ('../controllers/folder/orderLab.controller.js')

router.get('/items/laboratory-order', getItems); // all
router.get('/item/laboratory-order/:id', getItem); // one
router.post('/find/laboratory-order', findItem); // search one
router.post('/laboratory-order', create);
router.put('/laboratory-order/:id', update);
router.delete('/laboratory-order/:id', destroy);
router.get('/laboratory-order/', get); // paginate

router.post('/find/all/laboratory-order', findItems); // search by
router.get('/laboratory', agenda)

module.exports = app => app.use(prefixedRouter);
