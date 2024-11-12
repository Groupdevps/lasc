const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/doctor/diagnosticList.controller.js');

router.get('/items/diagnostic-list', getItems); // all
router.get('/item/diagnostic-list/:id', getItem); // one
router.post('/find/diagnostic-list', findItem); // search one
router.post('/diagnostic-list', create);
router.put('/diagnostic-list/:id', update);
router.delete('/diagnostic-list/:id', destroy);
router.get('/diagnostic-list/', get); // paginate

module.exports = app => app.use(prefixedRouter);
