const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const Hospitalization = require('../../controllers/hospitalization/hospitalization.controller.js'); // Asegúrate de ajustar el camino según la estructura de tu proyecto

//localhost:4000/api/v1/hospitalization

router.post('/hospitalization', Hospitalization.newHospitalization);
router.get('/hospitalizations', Hospitalization.getHospitalizations);


module.exports = app => app.use(prefixedRouter);
