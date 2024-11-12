const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/observationEvolutionNote.controller.js');

router.get('/items/observation-evolution-note', getItems); // all
router.get('/item/observation-evolution-note/:id', getItem); // one
router.post('/find/observation-evolution-note', findItem); // search one
router.post('/observation-evolution-note', create);
router.put('/observation-evolution-note/:id', update);
router.delete('/observation-evolution-note/:id', destroy);
router.get('/observation-evolution-note/', get); // paginate

module.exports = app => app.use(prefixedRouter);
