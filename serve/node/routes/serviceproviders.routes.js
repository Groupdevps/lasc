const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getServiceProvide, createServiceProvider, getServiceProviders
  
}  = require ( '../controllers/serviceproviders.controller.js');

router.get('/serviceproviders', getServiceProviders);
router.post('/serviceprovider', createServiceProvider);
router.put('/serviceproviders/:id');
router.delete('/serviceproviders/:id');
router.get('/serviceproviders/:id');
router.get('/serviceprovidersfind');

module.exports = app => app.use(prefixedRouter);
