// api/notes/:noteId

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

router.get('/', function(req,res, next) {
	res.json(req.currentNote);
});

// Update one Note
router.put('/', function(req, res, next) {
	return req.currentNote.set(req.body).save()
	.then(function(updatedNote) {
		res.json(updatedNote)
	})
	.then(null, next)
})

router.put('/share', function(req, res, next) {
	req.currentNote.share(req.body.email)
	.then(function(result) {
		res.json(result)
	})
})

router.put('/removeshare', function(req, res, next) {
	req.currentNote.removeShare(req.body.email)
	.then(function(result) {
		res.json(result)
	})
})

router.use('/tags', require('./note.tags.js'));
router.use('/trash', require('./note.trash.js'));



