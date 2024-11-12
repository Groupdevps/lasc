const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const MaterialController  = require('../../controllers/surgery/materialOsteoS.controller.js');

router.post('/materials', MaterialController.create);
router.get('/materials', MaterialController.getAll);
router.get('/materials/:id', MaterialController.getOne);
router.put('/materials/:id', MaterialController.update);
router.delete('/materials/:id', MaterialController.delete);

module.exports = app => app.use(prefixedRouter);