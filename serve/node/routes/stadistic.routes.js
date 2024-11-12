const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  main
  
}  = require ( '../controllers/statistic.controller.js');

//router.get('/items/stadistic', getItems); // all
//router.get('/item/stadistic/:id', getItem); // one
//router.post('/find/stadistic', main); // search one
//router.post('/stadistic', create);
//router.put('/stadistic/:id', update);
//router.delete('/stadistic/:id', destroy);
//router.get('/stadistic/', get); // paginate

router.post('/statistics/audits', main); 


module.exports = app => app.use(prefixedRouter);
