const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getGenders, createGender
  
}  = require ( '../controllers/genders.controller.js');

router.get('/items/genders', getGenders);
router.post('/gender', createGender);
router.put('/gender/:id');
router.delete('/gender/:id');
router.get('/gender/:id');

module.exports = app => app.use(prefixedRouter);
