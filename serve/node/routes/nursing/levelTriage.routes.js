// routes/levelTriageRoutes.js

const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);
const levelTriageController = require('../../controllers/nursing/levelTriageController');

router.post('/level-triage', levelTriageController.createLevelTriage);
router.get('/items/level-triage', levelTriageController.getLevelTriages);
router.get('/level-triage/:id', levelTriageController.getLevelTriageById);
router.put('/level-triage/:id', levelTriageController.updateLevelTriage);
router.delete('/level-triage/:id', levelTriageController.deleteLevelTriage);

module.exports = app => app.use(prefixedRouter);

