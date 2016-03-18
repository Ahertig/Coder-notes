'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');
var User = mongoose.model('User');

// Route: /api/:userId

router.use('/:notebookId/notes', require('../notes'));

//Create a notebook
router.post('/', function(req, res, next) {
	Notebook.create(req.body)
	.then(function(newNotebook) {
		res.send(newNotebook)
	})
	.then(null, next)
})
