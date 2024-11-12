// routes/hospitalExpenses.js

const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const hospitalExpenseController = require('../../controllers/nursing/hospitalExpense.controller.js');
const hospitalExpensePdfController = require('../../controllers/nursing/hospitalExpensePdf.controller.js');

router.post('/hospital-expense', hospitalExpenseController.create);
router.get('/items/hospital-expense', hospitalExpenseController.get);
router.get('/hospital-expense/:id', hospitalExpenseController.getItem);
router.put('/hospital-expense/:id', hospitalExpenseController.update);
router.delete('/hospital-expense/:id', hospitalExpenseController.destroy);

/* router.get('/hospital-expense/:attention', hospitalExpensePdfController.getHospitalExpenseDetails);
router.get('/hospital-expense/:attention/pdf', hospitalExpensePdfController.getHospitalExpenseDetailsPdf);
 */


module.exports = app => app.use(prefixedRouter);

