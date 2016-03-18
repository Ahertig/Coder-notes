'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Create a user
router.post('/', function(req, res, next) {
	User.create(req.body)
	.then(function(newUser) {
		res.send(newUser)
	})
	.then(null, next)
})

//Get all users
router.get('/', function(req, res, next){
  User.find()
  .then(function(allUsers){
    res.json(allUsers);
  })
  .then(null, next);
});

// Get one user
router.get('/:userId', function(req, res, next){
  User.findOne(req.params.userId)
  .then(function(user){
    res.json(user);
  })
  .then(null, next);
});

// Delete one user
router.delete('/:userId', function(req, res, next){
  User.remove(req.params.userId)
  .then(function(deletedUser){
    res.json(deletedUser);
  })
  .then(null, next);
});

//




