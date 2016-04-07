// Route /api/tags

'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
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
			if(notebook.trash === false){
				notebook.notes.forEach(function(note){
					if (note.trash === false)
	                tags = tags.concat(note.tags);
				})
			}
		})
		var _tagObj = _.groupBy(tags);
		res.json(tagCount(_tagObj));
	})
	.then(null, next)
});

// router.get('/',function(req,res,next){
// 	res.json(req.user.getTags())
// });



