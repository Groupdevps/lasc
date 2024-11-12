
const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js') //agregar una ruta estandarizada previa
const auth = require("../../middlewares/auth.js"); //autorizacion del perfil
prefixedRouter.use(prefix, router);
const download = require('../../controllers/downloadControllers/inventoryDownload.controller.js');
const pharmacyController = require('../../controllers/pharmacy/pharmacy.controller.js')

// Ruta para descargar el inventario
router.get('/inventory/pdf', download.inventoryDownload);

// Ruta para obtener el inventario
router.get('/inventory', pharmacyController.getInventory);

// Ruta para obtener una entrada específica del inventario
router.get('/inventory/entry', pharmacyController.getEntry);

// Ruta para crear una nueva entrada en el inventario
router.post('/inventory/entry', pharmacyController.createEntryInventory);

// Ruta para crear un nuevo despacho
//router.post('/inventory/dispatch', pharmacyController.createDispatch);

// Ruta para generar un voucher con la información del despacho
router.get('/inventory/voucher', pharmacyController.generateVoucher);

module.exports = app => app.use(prefixedRouter);