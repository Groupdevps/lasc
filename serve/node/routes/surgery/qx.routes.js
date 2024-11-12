const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);

const qxController = require('../../controllers/surgery/qx.controller.js');

router.post('/qx', qxController.createQx);
router.get('/qx', qxController.getQxByOrderId);

router.get('/qx/:id', qxController.getQxById);
router.put('/qx/:id', qxController.updateQx);
router.delete('/qx/:id', qxController.deleteQx);

module.exports = app => app.use(prefixedRouter);
