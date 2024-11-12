const { Router }  = require ( 'express');
const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems,
  create,
  getItem,
  update,
  get,
  findItem,
  destroy,
  searchForName
  
}  = require ( '../../controllers/admission/people.controller.js');

router.get('/people', getItems);
router.post('/person', create);
router.put('/person/:id', update);
router.delete('/person/:id', destroy);
router.get('/person/:id', getItem);
router.get('/people', get);
router.post('/find/person', findItem);
router.post('/find/person/name', searchForName);

module.exports = app => app.use(prefixedRouter);


