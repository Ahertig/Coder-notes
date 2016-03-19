// Route: /api/userID/notebooks/notebookId

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook')

//Get one notebook
router.get('/', function(req, res){
	res.send(req.currentNotebook)
})

//Update a notebook
router.put('/', function(req, res, next){
	req.currentNotebook.set(req.body).save()
	.then(function(updatedNotebook) {
		res.send(updatedNotebook)
	})
	.then(null, next)
})

//Delete a notebook
router.delete('/', function(req, res, next){
	req.currentNotebook.remove()
	.then(function(response) {
		res.send(response)
	})
	.then(null, next)
})

router.put('/share', function(req, res, next) {
	req.currentNotebook.share(req.body.email)
	.then(function(sharedNotebook) {
		res.send(sharedNotebook)
	})
})

router.use('/notes', require('../notes'));
