const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const {
  getCensus , censusDownload
} = require('../../controllers/hospitalization/census.controller.js');

//localhost:4000/api/v1/census

router.get('/census', getCensus);
router.get('/census/pdf', censusDownload);


module.exports = app => app.use(prefixedRouter);
