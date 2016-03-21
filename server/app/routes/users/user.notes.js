//  Route /api/users/:userId/usernotes

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notebook = mongoose.model('Notebook');
var Note = mongoose.model('Note');

// Get all notes for one user

router.get('/', function(req, res, next){
	// console.log("inside api users userid notes field", req.currentUser)
	var multidimensionalArrayOfNodeIds = [], 
		arrayOfNoteIds = [], 
		multidimensionalArrayOfTags = [], 
		arrayOfTags = [];

	// console.log("here are the notebooks:",req.currentUser.myNotebooks);

	// get an array of only note Ids
    multidimensionalArrayOfNodeIds = req.currentUser.myNotebooks.map(function(element) { return element.notes })
    
    // now reduce that to a one-dimensional list
    arrayOfNoteIds = multidimensionalArrayOfNodeIds.reduce(function(a, b) {
         return a.concat(b);
        });

    // find notes with those IDs
	Note.find({
		_id: {
			$in: arrayOfNoteIds
		}
	})
	.then(function(notes) {
		// console.log("here are the notes:", notes)
	    res.json(notes);
	})
	then(null, next)

});

