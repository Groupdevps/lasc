const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, getLabOrders, getLabOrdersAttention,ProcedureNoQxOrderList
  
}
  = require ( '../../controllers/doctor/order.controller.js');
  
const { orderDownload } = require('../../controllers/doctor/orderPdf.controller.js')

router.get('/order', getItems); // all
router.get('/items/order-lab', getLabOrders); // all
router.get('/items/order-lab/attention/:AttentionId', getLabOrders); // all
router.get('/item/order/:id', getItem); // one
router.post('/find/order', findItem); // search one
router.post('/order', create);
router.put('/order/:id', update);
router.delete('/order/:id', destroy);
router.get('/orders', get); // paginate
router.get('/order/no-qx', ProcedureNoQxOrderList)
router.get('/order/:id/pdf', orderDownload);


module.exports = app => app.use(prefixedRouter);
