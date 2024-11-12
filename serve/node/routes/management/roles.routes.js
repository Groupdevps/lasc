const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router,);
const roleController = require ( '../../controllers/management/roles.controller.js');


router.post('/role', roleController.createRole);
router.get('/role', roleController.getAllRoles);
router.get('/role/name', roleController.getRoles);
router.put('/role/:id', roleController.updateRole);
router.put('/role/:id/deactivate', roleController.deactivateRole);


module.exports = app => app.use(prefixedRouter);
