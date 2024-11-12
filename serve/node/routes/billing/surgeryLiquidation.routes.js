const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
prefixedRouter.use(prefix, router);
const surgeryLiquidationController = require('../../controllers/billing/surgeryLiquidation.controller.js');



router.get('/surgery-liquidations', surgeryLiquidationController.get);
router.get('/surgery-liquidations/names', surgeryLiquidationController.getNames);

module.exports = app => app.use(prefixedRouter);
