const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/doctor/medicalOrders.controller.js');
  const { medicalFormulaDownload } = require('../../controllers/downloadControllers/medicalFormulaDownload.controller.js')


router.get('/items/medical-order', getItems); // all
router.get('/item/medical-order/:id', getItem); // one
router.post('/find/medical-order', findItem); // search one
router.post('/medical-order', create);
router.put('/medical-order/:id', update);
router.delete('/medical-order/:id', destroy);
router.get('/medical-order/', get); // paginate
router.get('/medical-formula/:id/pdf', medicalFormulaDownload); //pdf
module.exports = app => app.use(prefixedRouter);
