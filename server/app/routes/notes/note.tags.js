// Route: /api/userID/notebooks/notebookId/notes/noteId/tags

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

// Get all tags of one note
router.get('/', function(req, res) {
	res.send(req.currentNote.tags)
})

// Add a new tag to the note
router.post('/', function(req, res) {
	req.currentNote.addTag(req.body.tag)
	.then(function(note) {
		res.send(note);	
	})
})

// Remove a tag from the note
router.delete('/', function(req, res) {
	req.currentNote.removeTag(req.body.tag)
	.then(function(note) {
		res.send(note)		
	})
})