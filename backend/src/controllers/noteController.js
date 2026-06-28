const { validationResult } = require('express-validator');
const noteService = require('../services/noteService');
const { sendSuccess, sendError } = require('../utils/responseHelper');

/**
 * Thin controller layer — validates input, calls service, sends response.
 * No business logic lives here.
 */

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(res, 400, 'Validation failed', errors.array());
    return false;
  }
  return true;
};

const createNote = async (req, res) => {
  if (!handleValidation(req, res)) return;
  try {
    const note = await noteService.createNote(req.body);
    sendSuccess(res, 201, 'Note created successfully', note);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

const getNotes = async (req, res) => {
  if (!handleValidation(req, res)) return;
  try {
    const { page, limit, status, tags } = req.query;
    const result = await noteService.getNotes({ page, limit, status, tags });
    sendSuccess(res, 200, 'Notes fetched successfully', result);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.params.id);
    if (!note) return sendError(res, 404, 'Note not found');
    sendSuccess(res, 200, 'Note fetched successfully', note);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

const updateNote = async (req, res) => {
  if (!handleValidation(req, res)) return;
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    if (!note) return sendError(res, 404, 'Note not found');
    sendSuccess(res, 200, 'Note updated successfully', note);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await noteService.deleteNote(req.params.id);
    if (!note) return sendError(res, 404, 'Note not found');
    sendSuccess(res, 200, 'Note deleted successfully');
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

const searchNotes = async (req, res) => {
  if (!handleValidation(req, res)) return;
  try {
    const { q, limit } = req.query;
    const notes = await noteService.searchNotes(q, limit ? Number(limit) : 10);
    sendSuccess(res, 200, `Found ${notes.length} result(s)`, notes);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote, searchNotes };
