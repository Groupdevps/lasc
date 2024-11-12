const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const ElectronicBillingAuthorizationController = require('../../controllers/billing/electronicBillingAuthorization.controller.js');

//localhost:4000/api/v1/bill-authorization


router.post('/bill-authorization', ElectronicBillingAuthorizationController.create);
router.get('/bill-authorization', ElectronicBillingAuthorizationController.getAll);
router.put('/bill-authorization/:id', ElectronicBillingAuthorizationController.update);
router.put('/bill-authorization/:id/deactive', ElectronicBillingAuthorizationController.deactivate);
router.delete('/bill-authorization/:id', ElectronicBillingAuthorizationController.delete);

module.exports = app => app.use(prefixedRouter);
