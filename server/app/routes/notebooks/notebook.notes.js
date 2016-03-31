// Route: /api/notebooks/:notebookId/notes

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');


//Get all notes of this notebook
router.get('/', function(req, res, next) {
	res.json(req.currentNotebook.notes)
})

// Create a note in this notebook
router.post('/', function(req, res, next) {
	req.currentNotebook.createNote(req.body)
	.then(function(note) {
		note.set({owner: req.user._id})
		return note.save()
	})
	.then(function(newNote) {
		console.log("ssss", newNote)
		res.json(newNote)
	})
	.then(null, next)
})
