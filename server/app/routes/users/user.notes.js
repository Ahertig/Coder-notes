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
	req.currentUser.getAllNotes()
	.then(function(notes) {
	    res.json(notes);
	})
	.then(null, next)

});

