const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, create, get, update, destroy
  
}  = require ( '../../controllers/admission/relationShips.controller.js');

router.post('/items/relationship', getItems);
router.post('/find/relationship', getItem);
router.post('/relationship', create);
router.put('/relationship/:id', update);
router.delete('/relationship/:id', destroy);
router.get('/relationship/:id', get);

module.exports = app => app.use(prefixedRouter);
