'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// Route api/userID/notebookId/notes

//Get all notes
// router.get('/', function(req, res, next) {
// 	User.find(req.params.userID)
// 	.then(function(user) {
// 		return user.getAllNotes()
// 	})
// 	.then(function(result) {
// 		res.send(result)
// 	})
// 	.then(null, next)
// })

// Create a note
router.post('/', function(req, res, next) {
	Notebook.findOne(req.params.notebookId)
	.then(function(notebook) {
		notebook.addNote()
	})
	.then(function(result) {
		res.send(result)
	})
	.then(null, next)
})

// Get all public notes
router.get('/', function() {
	
})