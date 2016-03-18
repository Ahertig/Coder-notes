'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');
var Note = mongoose.model('Note');
var User = mongoose.model('User');



// Route: /api/:userId/notebooks

//get all notebooks for a user
router.get('/', function(req, res,next){
	User.findById(user._id)
	.populate('notebooks')
	.then(function(user){
		if(user) { 
			if (user.user.notebooks) res.send(user.notebooks);
		} 
		else console.log("can't find the user")
	})
	.then(null, next)
})

//Create a notebook
router.post('/', function(req, res, next) {
	Notebook.create(req.body)
	.then(function(newNotebook) {
		res.send(newNotebook)
	})
	.then(null, next)
})



