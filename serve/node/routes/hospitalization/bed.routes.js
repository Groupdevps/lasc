const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const {
  getAllBeds,
  getBedById,
  createBed,
  updateBed,
  deactivateBed,
  deleteBed
} = require('../../controllers/hospitalization/bed.controller.js');

//localhost:4000/api/v1/beds

router.get('/beds', getAllBeds);
router.get('/beds/:id', getBedById);
router.post('/beds', createBed);
router.put('/beds/:id', updateBed);
router.patch('/beds/:id/deactivate', deactivateBed);
router.delete('/beds/:id', deleteBed);

module.exports = app => app.use(prefixedRouter);
