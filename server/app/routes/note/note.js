'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// api/note/:noteId

router.get('/', function(req,res, next) {
	Note.findById(req.params.noteId)
	.then(function(theNote) {
		//console.log("Found the note:", theNote)
		res.json(theNote);
	})
	.then(null, next)
});


// Get all tags of one note
router.get('/tags', function(req, res, next) {
	Note.findById(req.params.noteId)
	.then(function(note) {
		res.json(note.tags)		
	})
	.then(null, next)
})

// Add a new tag to the note
router.post('/tags', function(req, res, next) {
	req.currentNote.addTag(req.body.tag)
	.then(function(note) {
		res.json(note);	
	})
	.then(null, next)
})
// 
// Remove a tag from the note
router.put('/tags', function(req, res, next) {
	req.currentNote.removeTag(req.body.tag)
	.then(function(note) {
		res.json(note)		
	})
	.then(null, next)
})
// Add or Remove from Trash
router.put('/trash', function(req, res) {
	req.currentNote.removeFromTrash()
		.then(function(note) {
			res.send(note)		
		})
})

// Add or Remove from Trash
router.delete('/trash', function(req, res) {
	req.currentNote.addToTrash()
		.then(function(note) {
			res.send(note)		
		})
})