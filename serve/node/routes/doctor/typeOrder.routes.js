const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const typeOrderController = require('../../controllers/doctor/typeOrder.controller.js');


router.get('/type-orders', typeOrderController.getAllTypeOrders);

module.exports = app => app.use(prefixedRouter);
