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
	User.findOne(req.params.userId)
	.then(function (user) {
		user.set(req.body).save();
		res.send(user)
	})
	.then(null, next)

});

// Delete one user
router.delete('/', function(req, res, next){
  User.remove(req.params.userId)
  .then(function(deletedUser){
    res.json(deletedUser);
  })
  .then(null, next);
});

router.use('/notebooks', require('../notebooks'));

