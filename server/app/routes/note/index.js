'use strict';
var router = require('express').Router({mergeParams: true});
module.exports = router;
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

router.param('noteId', function(req, res, next, id) {
  Note.findById(id)
  .then(function(note) {
    req.currentNote = note;
    next();
  })
  .then(null, function(error) {
  	console.log("error: ", error)
  })
});



router.use('/:noteId', require('./note'));
