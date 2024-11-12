const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, update,download, generate
  
}  = require ( '../../controllers/institutionalReports/prehospitalCare.controller.js');
//localhost:4000/api/v1/prehospital-care

router.get('/prehospital-care/attention/:AttentionId', generate)
router.get('/prehospital-care/download/:id', download)
router.post('/prehospital-care', create);
router.put('/prehospital-care/:id', update);
router.get('/prehospital-care/:id', get);

module.exports = app => app.use(prefixedRouter);

