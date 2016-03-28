// Route api/users/:userId

'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var Gists = require('gists');
// var gists = new Gists({
//   username: 'ksenia0822', 
//   password: 'card1979'
// })

// router.get('/creategist', function(req, res, next) {
//   var gist = {
//   "description": "kitten",
//   "public": true,
//   "files": {
//     "file1.txt": {
//       "content": "kitten"
//     }
//   }
// }
//   gists.create(gist, function() {
//     console.log('kittens are here')
//   })
// })




// Get my account
router.get('/', function(req, res, next){
  res.json(req.user)
});

// Update my account
router.put('/', function(req, res, next){
	req.user.set(req.body).save()	
  .then(function(user){
    res.json(user);
  })
	.then(null, next)
});

// Delete my account
router.delete('/', function(req, res, next){
  req.user.remove()
  .then(function(deletedUser){
    res.json(deletedUser);
  })
  .then(null, next);
});

