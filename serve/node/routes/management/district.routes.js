const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const districtController
  = require ( '../../controllers/management/district.controller.js');

router.get('/district', districtController.getDistrictByCity); // all
router.post('/district', districtController.createDistrict); // create
router.post('/district/:id', districtController.deactiveDistrict); // deactive

module.exports = app => app.use(prefixedRouter);
