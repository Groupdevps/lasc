const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const CenterController  = require ( '../../controllers/management/center.controller.js')

router.post('/centers', CenterController.createCenter);
router.get('/centers/:id', CenterController.getCenter);
router.put('/centers/:id', CenterController.updateCenter);
router.delete('/centers/:id', CenterController.deleteCenter);
router.get('/centers', CenterController.getAllCenters);

module.exports = app => app.use(prefixedRouter);
