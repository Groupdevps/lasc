const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../../controllers/admission/historyPerson.controller.js');

router.get('/items/history-person', getItems); // all
router.get('/item/history-person/:id', getItem); // one
router.post('/find/history-person', findItem); // search one
router.post('/history-person', create);
router.put('/history-person/:id', update);
router.delete('/history-person/:id', destroy);
router.get('/history-person/', get); // paginate

module.exports = app => app.use(prefixedRouter);
