'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// api/note/:noteId

router.get('/', function(req,res) {
	Note.findById(req.params.noteId)
	.then(function(theNote) {
		console.log("Found the note:", theNote)
		res.json(theNote);
	},
	function(err) {
		console.error("Could not find note",err)
	})
});


// Get all tags of one note
router.get('/tags', function(req, res, next) {
	Note.findById(req.params.noteId)
	.then(function(note) {
		res.send(note.tags)		
	})
	.then(null, next)
})

// Add a new tag to the note
router.post('/tags', function(req, res) {
	req.currentNote.addTag(req.body.tag)
	.then(function(note) {
		res.send(note);	
	})
})
// 
// Remove a tag from the note
router.put('/tags', function(req, res) {
	req.currentNote.removeTag(req.body.tag)
	.then(function(note) {
		res.send(note)		
	})
})

// Add or Remove from Trash
router.put('/trash', function(req, res) {
	if (req.currentNote.trash) {
		req.currentNote.removeFromTrash()
		.then(function(note) {
			res.send(note)		
		})
	} else {
		req.currentNote.addToTrash()
		.then(function(note) {
			res.send(note)		
		})
	}
})