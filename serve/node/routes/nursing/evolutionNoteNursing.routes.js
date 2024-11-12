const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../../lib/prefix.js')
const auth = require("../../middlewares/auth.js");
prefixedRouter.use(prefix, router);
const { 
  getItems, getItem, findItem, create, get, update, destroy, findItems, nursingDischarge
  
}  = require ( '../../controllers/nursing/evolutionNoteNursing.controller.js');

router.get('/items/evolution-note-nursing', getItems); // all
router.get('/item/evolution-note-nursing/:id', getItem); // one
router.get('/find/evolution-note-nursing', findItem); // search one
router.post('/evolution-note-nursing', create);
router.put('/evolution-note-nursing/:id', update);
router.delete('/evolution-note-nursing/:id', destroy);
router.get('/evolution-note-nursing/', get); // paginate
router.post('/find/all/evolution-note-nursing', findItems); // search by
router.post('/nursing-discharge', nursingDischarge)

module.exports = app => app.use(prefixedRouter);
