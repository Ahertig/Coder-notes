// Route: /api/trash

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

// Get notes in the trash
router.get('/notes', function(req, res, next){
		req.user.getNotesInTrash(req.query)
		.then(function(notes) {
		    res.json(notes);
		})
		.then(null, next)
});


// Get notes and notebooks in the trash
router.get('/notebooks', function(req, res, next){
		req.user.getNotebooksInTrash(req.query)
		.then(function(notes) {
		    res.json(notes);
		})
		.then(null, next)
});


// Clean the trash