const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);
const inabilityController  = require('../../controllers/doctor/inability.controller.js');

//http://localhost:4000/api/v1/inabilities

// Definir la ruta para obtener la incapacidad por número de atención
router.get('/inabilities', inabilityController.getAll);
router.get('/inabilities/paginate', inabilityController.paginate);
router.get('/inabilities/:id', inabilityController.getById);

router.post('/inabilities', inabilityController.create);
router.put('/inabilities/:id', inabilityController.update);
router.delete('/inabilities/:id', inabilityController.delete);




module.exports = app => app.use(prefixedRouter);
