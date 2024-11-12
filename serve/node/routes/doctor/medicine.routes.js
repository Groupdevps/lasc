const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems
  
}  = require ( '../../controllers/doctor/medicine.controller.js');

router.get('/items/medicine', getItems); // all
router.get('/item/medicine/:id', getItem); // one
router.post('/find/medicine', findItem); // search one
router.post('/medicine', create);
router.put('/medicine/:id', update);
router.delete('/medicine/:id', destroy);
router.get('/medicine/', get); // paginate

router.post('/find/all/medicine', findItems); // search by

module.exports = app => app.use(prefixedRouter);
