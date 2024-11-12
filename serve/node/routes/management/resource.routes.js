const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const resourceController
  = require ( '../../controllers/management/resource.controller.js');

router.get('/section', resourceController.getResources); // get todos o por type recourse (modulo)
/* router.post('/section', resourceController.createResource); // crear
router.put('/section/:id', resourceController.updateResource); //cambiar modulo o nombre
router.put('/section/:id/deactive', resourceController.deactivateResource); //desactivar */

module.exports = app => app.use(prefixedRouter);
