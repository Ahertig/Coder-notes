// Route: /api/users/userID/notebooks/notebookId/notes/noteId

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
// var Note = mongoose.model('Note');

// Find one Note
router.get('/', function(req, res) {
	res.json(req.currentNote)
})

// Update one Note
router.put('/', function(req, res, next) {
	//console.log("updating one note")
	return req.currentNote.set(req.body).save()
	.then(function(updatedNote) {
		//console.log("updated note", updatedNote)
		res.json(updatedNote)
	})
	.then(null, next)
})

// Delete one Note
router.delete('/', function(req, res, next) {
	req.currentNote.remove()
	.then(function(response) {
		res.json(response)
	})
	.then(null, next)
})

router.use('/tags', require('./note.tags.js'));