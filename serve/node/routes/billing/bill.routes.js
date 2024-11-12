const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  create, find,get, update,createFiling, generateInvoicePDF
  
}  = require ( '../../controllers/billing/bill.controller.js');
const { billDownload, ElectronicBillDownload } = require('../../controllers/billing/billDownload.controller.js');

//localhost:4000/api/v1/bill


router.post('/bill', create);
router.post('/bill/filing', createFiling);
router.get('/bill/find/:AttentionId', find);
router.get('/bill/:id', get);
router.put('/bill/:id', update);

// Ruta para generar el PDF de la factura
router.get('/bill/:id/pdf', billDownload);
router.get('/bill/:id/xml', ElectronicBillDownload);

module.exports = app => app.use(prefixedRouter);
