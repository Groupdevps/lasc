const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const recoveryController = require('../../controllers/surgery/recovery.controller.js');

// Create a new Recovery
router.post('/recovery', recoveryController.createRecovery);

// Get all Recoveries
router.get('/recovery', recoveryController.getAllRecoveries);

// Get a specific Recovery by ID
router.get('/recovery/:id', recoveryController.getRecoveryById);

// Get a specific Recovery by OrderId
router.get('/recovery/ord/:orderId', recoveryController.getRecoveryByOrderId);


// Update a Recovery by ID
router.put('/recovery/:id', recoveryController.updateRecovery);

router.put('/recovery/:id/finalize', recoveryController.finalizeRecovery);

// Delete a Recovery by ID
router.delete('/recovery/:id', recoveryController.deleteRecovery);

module.exports = app => app.use(prefixedRouter);
