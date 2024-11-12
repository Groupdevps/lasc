const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getDetailsByBill, createDetail, updateDetail,deleteDetail, addingBillNumber, addDetail, detailsByBill
  
}  = require ( '../../controllers/billing/detail.controller.js');
//localhost:4000/api/v1/detail

router.get('/detail', getDetailsByBill)
router.post('/detail', createDetail); 
router.put('/detail/:id', updateDetail);
router.delete('/detail/:id', deleteDetail);

module.exports = app => app.use(prefixedRouter);
