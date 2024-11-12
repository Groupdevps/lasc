const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  downloadAttached
}  = require ( '../../controllers/downloadControllers/attachedDownload.controller.js');
const { orderLabDownload } = require('../../controllers/downloadControllers/orderLabDownload.controller.js')
const { medicalFormulaDownload } = require('../../controllers/downloadControllers/medicalFormulaDownload.controller.js')
const { outpatientOrderDownload } = require('../../controllers/downloadControllers/outpatientOrderDownload.controller.js')
const { expenseSheetDownload ,getExpenseSheet} = require('../../controllers/downloadControllers/expenseSheetDownload.controller.js')
const { medicalHistoryDownload } = require('../../controllers/downloadControllers/medicalHistoryDownload.controller.js')
//
router.post('/download/attached', downloadAttached);
router.get('/laboratory-order/:id/pdf', orderLabDownload); 
//router.get('/medical-formula/:id/pdf', medicalFormulaDownload); 
router.post('/download/order/outpatient', outpatientOrderDownload); 
router.get('/hospital-expense/:attention', getExpenseSheet); 
router.get('/hospital-expense/:attention/pdf', expenseSheetDownload); 
router.get('/emergency-medical-history/:id/pdf', medicalHistoryDownload); 

module.exports = app => app.use(prefixedRouter);
