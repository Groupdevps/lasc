const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getTypeids, createTypeid
  
}  = require ( '../controllers/typeIds.controller.js');

router.get('/items/typeids', getTypeids);
router.post('/item/typeid', createTypeid);
router.put('/typeid/:id');
router.delete('/typeid/:id');
router.get('/typeid/:id');

module.exports = app => app.use(prefixedRouter);
