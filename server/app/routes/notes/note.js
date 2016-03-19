// Route: /api/userID/notebooks/notebookId/notes/noteId

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// Find one Note
router.get('/', function(req, res) {
	res.send(req.currentNote)
})

// Update one Note
router.put('/', function(req, res, next) {
	req.currentNote.set(req.body).save()
	.then(function(updatedNote) {
		res.send(updatedNote)
	})
	.then(null, next)
})

// Delete one Note
router.delete('/', function(req, res, next) {
	req.currentNote.remove()
	.then(function(response) {
		res.send(response)
	})
	.then(null, next)
})