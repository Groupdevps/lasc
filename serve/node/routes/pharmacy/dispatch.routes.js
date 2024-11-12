const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js') //agregar una ruta estandarizada previa
const auth = require("../../middlewares/auth.js"); //autorizacion del perfil
prefixedRouter.use(prefix, router);
const DispatchController = require('../../controllers/pharmacy/dispatch.controller.js');
const { dispatchDownload } = require('../../controllers/pharmacy/dispatchPdf.controller.js')


router.post('/dispatch', DispatchController.createDispatch);
router.get('/dispatches', DispatchController.getAllDispatches);
router.get('/dispatch/:id', DispatchController.getDispatchById);
router.put('/dispatch/:id', DispatchController.updateDispatch);
//router.delete('/dispatch/:id', DispatchController.deleteDispatch);
router.get('/dispatch/:id/pdf', dispatchDownload);
router.get('/dispatch-supply', DispatchController.getAvailableProductsByAttentionId);


module.exports = app => app.use(prefixedRouter); 