const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, getDoctors,getUsersByRole
  
}  = require ( '../controllers/userroles.controller.js');

router.get('/items/userrole', getItems); // all
router.get('/item/userrole/:id', getItem); // one
router.post('/find/userrole', findItem); // search one
router.post('/userrole', create);
router.put('/userrole/:id', update);
router.delete('/userrole/:id', destroy);
router.get('/userrole/', get); // paginate

router.get('/items/doctors', getDoctors); // all
router.get('/items/usersbyrole/:RoleId', getUsersByRole); // users by Role

module.exports = app => app.use(prefixedRouter);
