const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/nursing/triage.controller.js');

router.get('/items/triage', getItems); // all
router.get('/item/triage/:id', getItem); // one
router.post('/find/triage', findItem); // search one
router.post('/triage', create);
router.put('/triage/:id', update);
router.delete('/triage/:id', destroy);
router.get('/triage/', get); // paginate

module.exports = app => app.use(prefixedRouter);
