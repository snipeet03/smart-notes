const express = require('express');
const router = express.Router();
const controller = require('../controllers/noteController');
const {
  createNoteValidator,
  updateNoteValidator,
  getNotesValidator,
  searchValidator,
} = require('../validators/noteValidators');

// IMPORTANT: /search must be defined BEFORE /:id to avoid route conflict
router.get('/search', searchValidator, controller.searchNotes);

router.get('/', getNotesValidator, controller.getNotes);
router.post('/', createNoteValidator, controller.createNote);

router.get('/:id', controller.getNoteById);
router.put('/:id', updateNoteValidator, controller.updateNote);
router.delete('/:id', controller.deleteNote);

module.exports = router;
