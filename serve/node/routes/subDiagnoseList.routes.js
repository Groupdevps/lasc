const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems
  
}  = require ( '../controllers/folder/subDiagnoseList.controller.js');

router.get('/items/subdiagnose-list', getItems); // all
router.get('/item/subdiagnose-list/:id', getItem); // one
router.post('/find/subdiagnose-list', findItem); // search one
router.post('/subdiagnose-list', create);
router.put('/subdiagnose-list/:id', update);
router.delete('/subdiagnose-list/:id', destroy);
router.get('/subdiagnose-list/', get); // paginate
router.post('/find/all/subdiagnose-list', findItems); // search by

module.exports = app => app.use(prefixedRouter);
