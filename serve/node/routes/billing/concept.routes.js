const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  createConcept,getConcept, updateConcept, deactiveConcept
  
}  = require ( '../../controllers/billing/concept.controller.js');
//localhost:4000/api/v1/concept


router.post('/:user/concept', createConcept);
router.get('/concept', getConcept);
router.put('/concept/:cup', updateConcept);
router.put('/concept/:cup/deactive', deactiveConcept);


module.exports = app => app.use(prefixedRouter);
