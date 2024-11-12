const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/typeRelationships.controller.js');

router.get('/items/typerelationship', getItems); // all
router.get('/item/typerelationship/:id', getItem); // one
router.post('/find/typerelationship', findItem); // search one
router.post('/typerelationship', create);
router.put('/typerelationship/:id', update);
router.delete('/typerelationship/:id', destroy);
router.get('/typerelationship/', get); // paginate

module.exports = app => app.use(prefixedRouter);
