

const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js') //agregar una ruta estandarizada previa
const auth = require("../../middlewares/auth.js"); //autorizacion del perfil
prefixedRouter.use(prefix, router);
const ProductController = require('../../controllers/pharmacy/product.controller.js');

router.get('/items/products', ProductController.getAllProducts)
router.post('/product', ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/product/:id', ProductController.getProductById);
router.put('/product/:id', ProductController.updateProduct);

router.put('/product/:id', ProductController.desactiveProduct);//desactivar
//router.delete('/product/:id', ProductController.deleteProduct);
router.get('/products/supply', ProductController.getProductList);

module.exports = app => app.use(prefixedRouter);