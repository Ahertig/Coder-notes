// Route api/users/:userId

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Get one user
router.get('/', function(req, res, next){
	
  res.json(req.currentUser)
  // User.findOne(req.params.userId)
  // .then(function(user){
  //   res.json(user);
  // })
  // .then(null, next);
});

// Update one user
router.put('/', function(req, res, next){
	User.findByID(req.params.userId)
	.then(function (user) {
		return user.set(req.body).save()		
	})
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

// ??? Should this route be removed?
router.get('/notes', function(req, res, next){
  console.log("inside api users userid notes for", req.currentUser)
  // res.send('hi');
});

router.use('/notebooks', require('../notebooks'));
router.use('/tags', require('./user.tags.js'));
router.use('/usernotes', require('./user.notes.js'));
