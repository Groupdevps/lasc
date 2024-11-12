const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const {
  getAllRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deactivateRoomType,
  deleteRoomType
} = require('../../controllers/hospitalization/roomType.controller.js');

//localhost:4000/api/v1/roomtypes

router.get('/roomtypes', getAllRoomTypes);
router.get('/roomtypes/:id', getRoomTypeById);
router.post('/roomtypes', createRoomType);
router.put('/roomtypes/:id', updateRoomType);
router.patch('/roomtypes/:id/deactivate', deactivateRoomType);
router.delete('/roomtypes/:id', deleteRoomType);


module.exports = app => app.use(prefixedRouter);
