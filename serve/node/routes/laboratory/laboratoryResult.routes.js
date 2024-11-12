const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  create, get, find, update, invalidate
  
}  = require ( '../../controllers/laboratory/laboratoryResult.controller.js');
const { laboratoryResultDownload } = require ('../../controllers/downloadControllers/resultLaboratoryDownload.controller.js')
//localhost:4000/api/v1/laboratory-result


router.get('/laboratory-result', get)
router.post('/laboratory-result', create);
router.get('/laboratory-result/:order/pdf', laboratoryResultDownload); //por query mandas si es por laboratory result o por orden
router.put('/laboratory-result/:id', update);
router.get('/laboratory-result/:id', find);
router.get('/laboratory-result/:id', invalidate);



module.exports = app => app.use(prefixedRouter);
