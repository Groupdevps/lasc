const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getRegimes, createRegime, get, update, destroy, getCenterRegimes
  
}  = require ( '../controllers/regimes.controller.js');

router.get('/items/regimes', getRegimes);
router.get('/items/regimes/center', getCenterRegimes );
router.post('/regime', createRegime);
router.put('/regime/:id', update);
router.delete('/regime/:id', destroy);
router.get('/regime/:id', get);

module.exports = app => app.use(prefixedRouter);
