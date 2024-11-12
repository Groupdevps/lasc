const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems,findItem, getItem, create, get, update, destroy,getEpicrisis
  
}  = require ( '../../controllers/supports/epicrisi.controller.js');


router.get('/epicrisis', getItems);
router.post('/find/epicrisis', findItem);//buscar la epicrisis de esa atencion
router.post('/epicrisis', create); //guardar la epicrisis
router.put('/epicrisis/:id', update); //actualizar epicrisis
router.delete('/epicrisis/:id', destroy);
router.get('/epicrisis/:id', get); //traer epicrisis
router.post('/download/epicrisis', getEpicrisis);//imprimir epicrisis
module.exports = app => app.use(prefixedRouter);

