'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// Find all Public Notes
router.get('/public', function() {
	Note.find()
	.then(function(notes) {
		res.json(notes)
	})
	.then(null, next)
})