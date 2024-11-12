const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/medicalFormula.controller.js');

router.get('/items/medical-formula', getItems); // all
router.get('/item/medical-formula/:id', getItem); // one
router.post('/find/medical-formula', findItem); // search one
router.post('/medical-formula', create);
router.put('/medical-formula/:id', update);
router.delete('/medical-formula/:id', destroy);
router.get('/medical-formula/', get); // paginate

module.exports = app => app.use(prefixedRouter);
