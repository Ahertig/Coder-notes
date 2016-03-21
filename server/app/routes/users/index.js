// Route api/users

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

// router.post('/', function(req, res, next) {
//   User.createUser(req.body)
//   .then(function(newUser) {
//     res.send(newUser)
//   })
//   .then(null, next)
// })



//Get all users
router.get('/', function(req, res, next){
  User.find()
  .then(function(allUsers){
    res.json(allUsers);
  })
  .then(null, next);
});

//Delete all users
router.delete('/', function(req, res, next){
  User.remove({})
  .then(function(allUsers){
    res.json(allUsers);
  })
  .then(null, next);
});

router.param('userId', function(req, res, next, id) {
  User.findById(id)
  .populate('myNotebooks sharedWithMeNotebooks')
  .then(function(user) {
    req.currentUser = user;
    next();
  })
});

router.use('/:userId', require('./user.js'));



