const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems, medicalDischarge
  
}  = require ( '../controllers/folder/evolutionNote.controller.js');

router.get('/items/evolution-note', getItems); // all
router.get('/item/evolution-note/:id', getItem); // one
router.post('/find/evolution-note', findItem); // search one
router.post('/evolution-note', create);
router.put('/evolution-note/:id', update);
router.delete('/evolution-note/:id', destroy);
router.get('/evolution-note/', get); // paginate
router.post('/find/all/evolution-note', findItems); // search by
router.post('/md', medicalDischarge); //medical discharge *alta medica* 



module.exports = app => app.use(prefixedRouter);
