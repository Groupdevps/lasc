const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
 create, get, findItem
}
  = require ( '../controllers/cau.controller.js');


router.get('/cau/:id', get); // one
router.post('/find/cau', findItem); // one
router.post('/cau', create); // one

module.exports = app => app.use(prefixedRouter);
