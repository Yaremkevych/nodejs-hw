import { Router } from 'express';
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNoteById);
router.patch(('/notes/:noteId', updateNote);)

export default router;
