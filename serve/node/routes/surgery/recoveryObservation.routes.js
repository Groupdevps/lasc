const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const recoveryObservationController = require('../../controllers/surgery/recoveryObservation.controller.js');

// Create a new RecoveryObservation
router.post('/recovery-observations', recoveryObservationController.createRecoveryObservation);

// Get all RecoveryObservations
router.get('/recovery-observations', recoveryObservationController.getAllRecoveryObservations);

// Get a specific RecoveryObservation by ID
router.get('/recovery-observations/:id', recoveryObservationController.getRecoveryObservationById);

// Update a RecoveryObservation by ID
router.put('/recovery-observations/:id', recoveryObservationController.updateRecoveryObservation);

// Delete a RecoveryObservation by ID
router.delete('/recovery-observations/:id', recoveryObservationController.deleteRecoveryObservation);

module.exports = app => app.use(prefixedRouter);
