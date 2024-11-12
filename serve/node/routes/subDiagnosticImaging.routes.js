const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy
  
}
  = require ( '../controllers/folder/subDiagnosticImaging.controller.js');

router.get('/items/sub-diagnostic-Imaging', getItems); // all
router.get('/item/sub-diagnostic-Imaging/:id', getItem); // one
router.post('/find/sub-diagnostic-Imaging', findItem); // search one
router.post('/sub-diagnostic-Imaging', create);
router.put('/sub-diagnostic-Imaging/:id', update);
router.delete('/sub-diagnostic-Imaging/:id', destroy);
router.get('/sub-diagnostic-Imaging/', get); // paginate

module.exports = app => app.use(prefixedRouter);
