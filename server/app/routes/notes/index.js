// Route: /api/userID/notebookId/notes

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');


//Get all notes of this notebook
router.get('/', function(req, res, next) {
	res.send(req.currentNotebook.notes)
})

// Create a note in this notebook
router.post('/', function(req, res, next) {
	req.currentNotebook.createNote(req.body)
	.then(function(newNote) {
		res.send(newNote)
	})
	.then(null, next)
})

router.param('noteId', function(req, res, next, id) {
  Note.findById(id)
  .then(function(note) {
    req.currentNote = note;
    next();
  })
  .then(null, function(error) {
  	console.log("error: ", error)
  })
});

router.use('/:noteId', require('./note.js'));
