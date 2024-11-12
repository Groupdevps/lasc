const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/doctor/diagnosticAid.controller.js');

/* router.get('/items/diagnostic-help', getItems); // all
router.get('/item/diagnostic-help/:id', getItem); // one
router.post('/find/diagnostic-help', findItem); // search one
router.post('/diagnostic-help', create);
router.put('/diagnostic-help/:id', update);
router.delete('/diagnostic-help/:id', destroy);
router.get('/diagnostic-help/', get); // paginate
 */
module.exports = app => app.use(prefixedRouter);
