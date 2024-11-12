const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getUsers,
  createUser,
  deleteUser,
  update,
  validEmail,
  Create,
  updateUsername,
  getDoctors,
  resetPasswordById

}  = require ( '../../controllers/management/users.controller.js');

router.get('/items/user', getUsers);
router.post('/register', createUser);
router.put('/user/:id' , update);
router.put('/user/:id/username' , updateUsername);
router.delete('/user/:id', deleteUser);
router.get('/user/:id');
router.post('/validEmail', validEmail)
router.post('/user' , Create)
router.put('/reset-password/:id', resetPasswordById);



router.put('/update/username/:id'  , updateUsername);



module.exports = app => app.use(prefixedRouter);


