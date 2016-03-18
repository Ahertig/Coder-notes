'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');

// Route: /api/:userId

//Create a notebook
router.post('/', function(req, res, next) {
	Notebook.create(req.body)
	.then(function(newNotebook) {
		res.send(newNotebook)
	})
	.then(null, next)
})
