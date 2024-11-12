const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/addedMedication.controller');


router.get('/items/added-medication', getItems); // all
router.get('/item/added-medication/:id', getItem); // one
router.post('/find/added-medication', findItem); // search one
router.post('/added-medication', create);
router.put('/added-medication/:id', update);
router.delete('/added-medication/:id', destroy);
router.get('/added-medication/', get); // paginate

module.exports = app => app.use(prefixedRouter);
