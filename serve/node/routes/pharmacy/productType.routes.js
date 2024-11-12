const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js') //agregar una ruta estandarizada previa
const auth = require("../../middlewares/auth"); //autorizacion del perfil
prefixedRouter.use(prefix, router);
const ProductTypeController = require('../../controllers/pharmacy/productType.controller.js');

router.post('/product-type', ProductTypeController.createProducType);
router.get('/product-types', ProductTypeController.getProductType);
router.get('/product-type/:id', ProductTypeController.getProductTypeById);
router.put('/product-type/:id', ProductTypeController.desactiveProductType);
//router.delete('/product-type/:id', ProductTypeController.deleteProductType);

module.exports = app => app.use(prefixedRouter);