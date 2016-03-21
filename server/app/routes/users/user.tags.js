// Route /api/users/:userId/tags

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notebook = mongoose.model('Notebook');
var Note = mongoose.model('Note');

// Get all tags for one user
// Note: this function should be rewritten because of callback hell.
// I'm not sure how, though!
// Error handling should also be improved.

router.get('/', function(req, res, next){
	var multidimensionalArrayOfNodeIds = [], 
		arrayOfNoteIds = [], 
		multidimensionalArrayOfTags = [], 
		arrayOfTags = [];

	User.findOne(req.currentUser._id)
	.then(function(user) {
		Notebook.find({ 
			_id: { $in: user.myNotebooks
		   }
		})
		.then(function(notebooks) {
			// console.log("here are the notebooks:",notebooks);

			// get an array of only note Ids
		    multidimensionalArrayOfNodeIds = notebooks.map(function(element) { return element.notes })
		    
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
				// get an array of array of tags
			    multidimensionalArrayOfTags = notes.map(function(element) { return element.tags })
			    
			    // now reduce that to a one-dimensional list
			    arrayOfTags = multidimensionalArrayOfTags.reduce(function(a, b) {
			         return a.concat(b);
			        });


			    // sort and filter for unique values
				arrayOfTags = arrayOfTags.sort().filter(function (e, i, arr) {
					return arr.lastIndexOf(e) === i;
				});

			    res.json(arrayOfTags);
			})
		})
	})
});

