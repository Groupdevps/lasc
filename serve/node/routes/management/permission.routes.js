const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const permissionController  = require ( '../../controllers/management/permission.controller.js');

router.post('/permission',permissionController.createPermission ); // create
router.put('/permission/:id', permissionController.updatePermission); //update
router.delete('/permissions/:id', permissionController.deletePermission); //delete


module.exports = app => app.use(prefixedRouter);
