// Route api/users/:userId

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Get one user
router.get('/', function(req, res, next){
  res.json(req.currentUser)
});

// Update one user
router.put('/', function(req, res, next){
	req.currentUser.set(req.body).save()	
  .then(function(user){
    res.json(user);
  })
	.then(null, next)
});

// Delete one user
router.delete('/', function(req, res, next){
  req.currentUser.remove()
  .then(function(deletedUser){
    res.json(deletedUser);
  })
  .then(null, next);
});

// router.use('/notebooks', require('../notebooks'));
router.use('/tags', require('./user.tags.js'));
router.use('/usernotes', require('./user.notes.js'));
