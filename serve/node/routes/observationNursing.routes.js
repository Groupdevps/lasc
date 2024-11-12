const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/observationNursing.controller.js');

router.get('/items/observation-nursing', getItems); // all
router.get('/item/observation-nursing/:id', getItem); // one
router.post('/find/observation-nursing', findItem); // search one
router.post('/observation-nursing', create);
router.put('/observation-nursing/:id', update);
router.delete('/observation-nursing/:id', destroy);
router.get('/observation-nursing/', get); // paginate

module.exports = app => app.use(prefixedRouter);
