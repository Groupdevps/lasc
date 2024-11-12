const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const procedureController = require('../../controllers/surgery/procedure.controller.js');

//localhost:4000/api/v1/procedures


router.post('/procedures', procedureController.create);
router.get('/procedures', procedureController.findAll);
router.get('/procedures/:id', procedureController.findOne);
router.put('/procedures/:id', procedureController.update);
router.delete('/procedures/:id', procedureController.remove);

module.exports = app => app.use(prefixedRouter);
