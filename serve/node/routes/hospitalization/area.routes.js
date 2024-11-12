const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deactivateArea,
  deleteArea
} = require('../../controllers/hospitalization/area.controller.js');

//localhost:4000/api/v1/areas

router.get('/areas', getAllAreas);
router.get('/areas/:id', getAreaById);
router.post('/areas', createArea);
router.put('/areas/:id', updateArea);
router.patch('/areas/:id/deactivate', deactivateArea);
router.delete('/areas/:id', deleteArea);

module.exports = app => app.use(prefixedRouter);
