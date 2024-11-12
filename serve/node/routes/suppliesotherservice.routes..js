const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/suppliesOtherServices.controller.js');

router.get('/items/supplies-other-service', getItems); // all
router.get('/item/supplies-other-service/:id', getItem); // one
router.post('/find/supplies-other-service', findItem); // search one
router.post('/supplies-other-service', create);
router.put('/supplies-other-service/:id', update);
router.delete('/supplies-other-service/:id', destroy);
router.get('/supplies-other-service/', get); // paginate

module.exports = app => app.use(prefixedRouter);
