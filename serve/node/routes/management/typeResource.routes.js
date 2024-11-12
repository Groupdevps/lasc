const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const TypeResourceController 
  = require ( '../../controllers/management/typeresource.controller.js');

router.get('/module', TypeResourceController.getActiveTypeResources); // all
 /* router.post('/module', TypeResourceController.createTypeResource); // create
router.put('/module/:id', TypeResourceController.updateTypeResourceName);//actualizar
router.put('/module/:id/deactive', TypeResourceController.deactivateTypeResource); // deactive
  */
module.exports = app => app.use(prefixedRouter);