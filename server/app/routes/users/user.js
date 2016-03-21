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

//ZS: findById(req.params.userId) or findOne({_id:req.params.userId})
router.put('/', function(req, res, next){
	User.findOne(req.params.userId)
	.then(function (user) {
		user.set(req.body).save();
		res.send(user)
	})
	.then(null, next)

});

// Delete one user
//ZS: ? User.findbyID(req.params.userId).then(function(user){user.remove()})
//when delete a user, pre delete all notebooks and notes belonging to the user? 

router.delete('/', function(req, res, next){
  User.remove(req.params.userId)
  .then(function(deletedUser){
    res.json(deletedUser);
  })
  .then(null, next);
});

router.use('/notebooks', require('../notebooks'));
// router.use('/notes', require('../notes/notes.js'));

