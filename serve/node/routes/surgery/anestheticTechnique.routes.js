const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);

const AnestheticTechniqueController = require('../../controllers/surgery/anestheticTechnique.controller.js');


// Crear una nueva técnica de anestesia
router.post('/anesthetic-technique', AnestheticTechniqueController.create);

// Obtener todas las técnicas de anestesia
router.get('/anesthetic-technique', AnestheticTechniqueController.getAll);

// Obtener una técnica de anestesia por ID
router.get('/anesthetic-technique/:id', AnestheticTechniqueController.getById);

// Actualizar una técnica de anestesia por ID
router.put('/anesthetic-technique/:id', AnestheticTechniqueController.update);

// Eliminar una técnica de anestesia por ID
router.delete('/anesthetic-technique/:id', AnestheticTechniqueController.delete);

module.exports = app => app.use(prefixedRouter);
