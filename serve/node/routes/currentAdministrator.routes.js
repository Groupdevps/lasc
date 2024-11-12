const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getCurrentAdministrator,
  getCurrentAdministrators,
  get,
  create,
  update,
  destroy,
  
}  = require ( '../controllers/currentAdministrator.controller.js');

router.get('/items/current-administrator', getCurrentAdministrators);
router.post('/current-administrator', create);
router.put('/current-administrator/:id', update);
router.delete('/current-administrator/:id', destroy);
router.get('/current-administrator/:id', get);
router.post('/current-administrator-find', getCurrentAdministrator)

module.exports = app => app.use(prefixedRouter);
