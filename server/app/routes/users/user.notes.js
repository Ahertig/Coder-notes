//  Route /api/users/:userId/notes

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
// var User = mongoose.model('User');
// var Notebook = mongoose.model('Notebook');
// var Note = mongoose.model('Note');

// Get all notes for one user
// Note: this function should be rewritten because of callback hell.
// I'm not sure how, though!
// Error handling should also be improved.

router.get('/', function(req, res, next){
	console.log("inside api users userid notes field", req.currentUser)
	// var multidimensionalArrayOfNodeIds = [], 
	// 	arrayOfNoteIds = [], 
	// 	multidimensionalArrayOfTags = [], 
	// 	arrayOfTags = [];


	res.json('hi');

	// User.findOne(req.currentUser._id)
	// .then(function(user) {

		// Notebook.find({ 
		// 	_id: { $in: req.currentUser.myNotebooks
		//    }
		// })
		// .then(function(notebooks) {
		// 	console.log("here are the notebooks:",notebooks);

		// 	// get an array of only note Ids
		//     multidimensionalArrayOfNodeIds = notebooks.map(function(element) { return element.notes })
		    
		//     // now reduce that to a one-dimensional list
		//     arrayOfNoteIds = multidimensionalArrayOfNodeIds.reduce(function(a, b) {
		//          return a.concat(b);
		//         });

		//     // find notes with those IDs
		// 	Note.find({
		// 		_id: {
		// 			$in: arrayOfNoteIds
		// 		}
		// 	})
		// 	.then(function(notes) {
		// 		console.log("here are the notes:", notes)
		// 	    res.json(notes);
		// 	})
		// })


	// })
});

