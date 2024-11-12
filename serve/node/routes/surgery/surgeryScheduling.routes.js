const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const SurgerySchedulingController = require('../../controllers/surgery/surgeryScheduling.controller.js');

router.post('/surgery-scheduling', SurgerySchedulingController.create);
router.get('/surgery-scheduling', SurgerySchedulingController.getAll);
router.get('/surgery-scheduling/ord/:OrderId', SurgerySchedulingController.getByOrder);
router.get('/surgery-scheduling/:id', SurgerySchedulingController.getById);
router.put('/surgery-scheduling/:id', SurgerySchedulingController.update);
router.delete('/surgery-scheduling/:id', SurgerySchedulingController.delete);

module.exports = app => app.use(prefixedRouter);
