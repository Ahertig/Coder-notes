// Route: /api/users/userID/notes

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// Get all notes for the user
router.get('/', function(req, res, next) {
	
})

