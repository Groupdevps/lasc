const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const recommendationController = require('../../controllers/doctor/recommendation.controller.js');


router.get('/recommendation', recommendationController.getAllRecommendations);
router.get('/recommendation/:id', recommendationController.getRecommendationById);
router.post('/recommendation', recommendationController.createRecommendation);
router.put('/recommendation/:id', recommendationController.updateRecommendation);
router.delete('/recommendation/:id', recommendationController.deleteRecommendation);


module.exports = app => app.use(prefixedRouter);

