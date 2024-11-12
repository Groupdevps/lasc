// routes/levelTriageRoutes.js

const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const application = require('../../controllers/nursing/application.controller.js');

router.post('/apply', application.createApply);
router.get('/apply/:id', application.getApplyById);
router.get('/applies', application.getApplies);

module.exports = app => app.use(prefixedRouter);

