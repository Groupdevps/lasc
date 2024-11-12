const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const {
  getAllStayOrders,
  getStayOrderById,
  createStayOrder,
  updateStayOrder,
  deactivateStayOrder,
  deleteStayOrder
} = require('../../controllers/hospitalization/stayOrder.controller.js');

//localhost:4000/api/v1/stay-orders

router.get('/stay-orders', getAllStayOrders);
router.get('/stay-orders/:id', getStayOrderById);
router.post('/stay-orders', createStayOrder);
router.put('/stay-orders/:id', updateStayOrder);
router.patch('/stay-orders/:id/deactivate', deactivateStayOrder);
router.delete('/stay-orders/:id', deleteStayOrder);

module.exports = app => app.use(prefixedRouter);
