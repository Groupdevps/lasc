const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems, download,
  historical
  
}  = require ( '../../controllers/doctor/emergencyMedicalHistory.controller.js');
const EMHPdfController = require('../../controllers/doctor/emergencyMedicalHistoryPdf.controller.js');
const { medicalHistoryDownload } = require('../../controllers/downloadControllers/medicalHistoryDownload.controller.js')

router.get('/items/emergency-medical-history', getItems); // all
router.get('/item/emergency-medical-history/:id', getItem); // one
router.post('/find/emergency-medical-history', findItem); // search one
router.post('/emergency-medical-history', create);
router.put('/emergency-medical-history/:id', update);
router.delete('/emergency-medical-history/:id', destroy);
router.get('/emergency-medical-history/', get); // paginate
router.get('/emh/h/:patient', historical); // search by numberid

router.get('/emergency-medical-history/:id/pdf', medicalHistoryDownload);




module.exports = app => app.use(prefixedRouter);
