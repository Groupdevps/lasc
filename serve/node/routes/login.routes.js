const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  loginValidation, 
  logout
}  = require ( '../controllers/login.controller.js');


router.post('/signin', loginValidation);
router.post('/logout', logout);



module.exports = app => app.use(prefixedRouter);
