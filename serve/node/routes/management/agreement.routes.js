const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/management/agreement.controller.js');

router.get('/items/agreement', getItems); // all
router.get('/item/agreement/:id', getItem); // one
router.post('/find/agreement', findItem); // search one
router.post('/agreement', create);
router.put('/agreement/:id', update);
router.delete('/agreement/:id', destroy);
router.get('/agreement', get); // paginate

module.exports = app => app.use(prefixedRouter);
