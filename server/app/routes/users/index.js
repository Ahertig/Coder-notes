// Route api/

'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');


//Create a user
router.post('/users', function(req, res, next) {
	mongoose.model('User').create(req.body)
	.then(function(newUser) {
		res.json(newUser)
	})
	.then(null, function(err) {
    console.log(err)
  })
})

//Get all users
router.get('/users', function(req, res, next){
  User.find()
  .then(function(allUsers){
    res.json(allUsers);
  })
  .then(null, next);
});

//Delete all users (for testing, to be removed)
router.delete('/users', function(req, res, next){
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
  .then(null, next)

});

router.use('/notes', require('../notes'));
router.use('/notebooks', require('../notebooks'));
router.use('/:userId', require('./user.js'));



