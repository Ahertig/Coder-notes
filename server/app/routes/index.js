'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/public', require('./public-data'));
router.use('/notes', require('./notes'));


// I am not sure where to put this route. 
// It is a simplified way to reach one note.
// I stored it in this file for now, but feel free to move to a different folder or file.
// Sorry!

var mongoose = require('mongoose');
var Note = mongoose.model('Note');

router.get('/note/:noteId', function(req,res) {
	Note.findById(req.params.noteId)
	.then(function(theNote) {
		console.log("Found the note:", theNote)
		res.json(theNote);
	},
	function(err) {
		console.error("Could not find note",err)
	})
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
