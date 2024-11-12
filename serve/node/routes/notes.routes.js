const { Router }  = require ( 'express');

const router = Router();
const prefixedRouter = Router();
const prefix = require('../lib/prefix.js')
const auth = require("../middlewares/auth");
prefixedRouter.use(prefix, router);

const NoteTypeController = require('../controllers/noteType.controller.js');
const NoteController = require('../controllers/note.controller.js');
const { noteDownload } = require('../controllers/notePdf.controller.js');

// Rutas para NoteType
router.post('/note-types', NoteTypeController.create);
router.get('/note-types', NoteTypeController.getAll);
router.get('/note-types/:id', NoteTypeController.getById);
router.put('/note-types/:id', NoteTypeController.update);
router.delete('/note-types/:id', NoteTypeController.delete);

// Rutas para NoteByAttention
router.post('/note', NoteController.create);
router.get('/note', NoteController.getAll);
router.get('/note/:id', NoteController.getById);
router.put('/note/:id', NoteController.update);
router.delete('/note/:id', NoteController.delete);


router.get('/note-pdf', noteDownload);






module.exports = app => app.use(prefixedRouter);
