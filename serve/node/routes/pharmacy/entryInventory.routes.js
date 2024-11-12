

const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js') //agregar una ruta estandarizada previa
const auth = require("../../middlewares/auth"); //autorizacion del perfil
prefixedRouter.use(prefix, router);
const entryInventoryController = require('../../controllers/pharmacy/entryInventory.controller.js');

//router.post('/entry-inventory', entryInventoryController.createEntryInventory);
router.get('/entries-inventory', entryInventoryController.getEntryInventories);
router.get('/entry-inventory/:id', entryInventoryController.getEntryInventoryById);
//router.put('/entry-inventory/:id', entryInventoryController.updateEntryInventory);
//router.delete('/entry-inventory/:id', entryInventoryController.deleteEntryInventory);

module.exports = app => app.use(prefixedRouter);