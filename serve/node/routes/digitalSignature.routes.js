const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const digitalSignatureController = require('../controllers/digitalSignature.controller');

// Rutas para la firma digital
router.post('/digital-signature', digitalSignatureController.createDigitalSignature);
router.put('/digital-signature/:id', digitalSignatureController.updateDigitalSignature);
router.get('/digital-signature/:id', digitalSignatureController.getDigitalSignature);

module.exports = app => app.use(prefixedRouter);
