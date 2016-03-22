// Route: /api/users/userID/notebooks/notebookId/notes/noteId

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
// var Note = mongoose.model('Note');

// Find one Note
router.get('/', function(req, res) {
	res.send(req.currentNote)
})

// Update one Note
router.put('/', function(req, res, next) {
	console.log("updating one note")
	req.currentNote.set(req.body).save()
	.then(function(updatedNote) {
		console.log("updated note", updatedNote)
		res.send(updatedNote)
	})
	.then(null, function(err) {
		console.error("error putting note",err)
	})
})

// Delete one Note
router.delete('/', function(req, res, next) {
	req.currentNote.remove()
	.then(function(response) {
		res.send(response)
	})
	.then(null, next)
})

router.use('/tags', require('./note.tags.js'));