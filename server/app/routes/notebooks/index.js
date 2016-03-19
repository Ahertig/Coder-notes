'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Notebook = mongoose.model('Notebook');
var User = mongoose.model('User');
var Note = mongoose.model('Note');

// Route: /api/:userId/notebooks

//get all notebooks of a user

router.get('/', function(req, res,next){
	User.findById(req.currentuserID)
	.populate('notebooks')
	.then(function(user){
		if(user) { 
			if (user.notebooks) res.send(user.notebooks);
		} 
		else console.log("can't find the user");
	})
	.then(null, next)
})

//get a notebook of a user
router.get('/:notebookID', function(req, res,next){
	Notebook.findById(req.params.notebookID)
	.then(function(notebook){
		res.send(notebook);
	})
	.then(null. next)
})

//Create a new notebook 
router.post('/', function(req, res, next) {

	Notebook.addNewNotebook(req.body, req.currentuserID)
	.then(function(){
		res.send("New notebook is created successfully!")
	})
	.then(null, next)
	// Notebook.create(req.body)
	// .then(function(newNotebook) {
	// 	res.send(newNotebook)
	// })
	// .then(null, next)
})

//update existing notebook 
router.put('/:notebookID', function(req, res, next) {
    
	Notebook.findByID(req.params.notebookID)
	.then(function(notebook){
		notebook.set(res.body);
		return notebook.save()
	})
	.then(function(updatednotebook){
		res.send(updatednotebook);
	})
	.then(null, next)
})

//remove a notebook 
router.delete('/:notebookID', function(req, res, next){
	var notebook;
	Notebook.findByID(req.params.notebookID)
	.populate('notes')
	.then(function(_notebook){
		notebook = _notebook;
		return Promise.map(notebook.notes, function(note){
			note.trash = true;
		})
	})
	.then(function(){
		notebook.remove()
	})
    // need to delete notebookID from user notebooks
    //to be continued :)
})

router.use('/:notebookId/notes', require('../notes'));


