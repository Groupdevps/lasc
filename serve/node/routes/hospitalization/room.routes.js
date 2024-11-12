const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deactivateRoom,
    deleteRoom
  } = require('../../controllers/hospitalization/room.controller.js');
//localhost:4000/api/v1/rooms

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);
router.post('/rooms', createRoom);
router.put('/rooms/:id', updateRoom);
router.patch('/rooms/:id/deactivate', deactivateRoom);
router.delete('/rooms/:id', deleteRoom);


module.exports = app => app.use(prefixedRouter);
