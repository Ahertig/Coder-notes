// api/notes/:noteId

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

router.param('noteId', function(req, res, next, id) {
  Note.findById(id)
  .then(function(note) {
    req.currentNote = note;
    next();
  })
  .then(null, next)
});


// router.get('/', function(req,res, next) {
// 	Note.findById(req.params.noteId)
// 	.then(function(theNote) {
// 		res.json(theNote);
// 	})
// 	.then(null, next)
// });

router.get('/', function(req,res, next) {
	res.json(req.currentNote);
});

// Get all tags of one note

router.get('/tags', function(req,res, next) {
	res.json(req.currentNote.tags);
});

// router.get('/tags', function(req, res, next) {
// 	Note.findById(req.params.noteId)
// 	.then(function(note) {
// 		res.json(note.tags)		
// 	})
// 	.then(null, next)
// })

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