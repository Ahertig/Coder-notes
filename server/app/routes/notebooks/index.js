// Route: /api/:userId/notebooks

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Notebook = mongoose.model('Notebook');
var Note = mongoose.model('Note');

// Create a notebook
router.post('/', function(req, res, next) {
	req.currentUser.createNotebook(req.body)
	.then(function(notebook) {
		res.send(notebook)
	})
	.then(null, next)
})

router.get('/', function(req, res, next) {
	res.send(req.currentUser.myNotebooks.concat(req.currentUser.sharedWithMeNotebooks))
})

//Get all own notebooks of a user

// router.get('/own', function(req, res, next) {
// 	res.send(req.currentUser.myNotebooks)
// })

// Another way to get shared notebooks:
router.get('/own', function(req, res, next) {
	mongoose.model('User').findById(req.currentUser._id)
	.deepPopulate('myNotebooks.notes')
	.then(function(user) {
		res.send(user.myNotebooks)
	})
	.then(null, next)
})

//Get all shared notebooks of a user
// router.get('/shared', function(req, res, next) {
// 	res.send(req.currentUser.sharedWithMeNotebooks)
// })

// Another way to get shared notebooks:
router.get('/shared', function(req, res, next) {
	mongoose.model('User').findById(req.currentUser._id)
	.deepPopulate('sharedWithMeNotebooks.notes')
	.then(function(user) {
		res.send(user.sharedWithMeNotebooks)
	})
	.then(null, next)
})

router.param('notebookId', function(req, res, next, id) {
  Notebook.findById(id)
  .populate('notes')
  .then(function(notebook) {
    req.currentNotebook = notebook;
    next();
  })
  .then(null, function(error) {
  	console.log("error: ", error)
  })
});

router.use('/:notebookId', require('./notebook.js'));



