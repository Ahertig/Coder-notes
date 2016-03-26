// Route /api/tags

'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notebook = mongoose.model('Notebook');
var Note = mongoose.model('Note');

// Get all tags for one user
router.get('/',function(req,res,next){
	var tags = [];
	var tagsArray = [];
	var tagCount = function(_tagObj){		
		for (var key in _tagObj){
			if (_tagObj.hasOwnProperty(key)) {
				var tagobj={};
                tagobj.tag = key.toString();
				tagobj.count = _tagObj[key].length;	
				tagsArray.push(tagobj);				
			}
		}
		return tagsArray;
	}

	req.user
	.deepPopulate('myNotebooks.notes')
	.then(function(user) {
		user.myNotebooks.forEach(function(notebook){
			notebook.notes.forEach(function(note){
                tags = tags.concat(note.tags);
			})
		})
		var _tagObj = _.groupBy(tags);
		res.json(tagCount(_tagObj));
	})
	.then(null, next)
});

// router.get('/', function(req, res, next){
// 	var multidimensionalArrayOfNodeIds = [], 
// 		arrayOfNoteIds = [], 
// 		multidimensionalArrayOfTags = [], 
// 		arrayOfTags = [];

//     multidimensionalArrayOfNodeIds = req.user.myNotebooks.map(function(element) { return element.notes })
    
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
// 		// console.log("here are the notes:", notes)
// 		// get an array of array of tags
// 	    multidimensionalArrayOfTags = notes.map(function(element) { return element.tags })
	    
// 	    // now reduce that to a one-dimensional list
// 	    arrayOfTags = multidimensionalArrayOfTags.reduce(function(a, b) {
// 	         return a.concat(b);
// 	        });


// 	    // sort and filter for unique values
// 		arrayOfTags = arrayOfTags.sort().filter(function (e, i, arr) {
// 			return arr.lastIndexOf(e) === i;
// 		});

// 	    res.json(arrayOfTags);
// 	})
// });

