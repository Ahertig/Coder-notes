'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;

router.use('/public', require('./public-data'));

router.use('/', require('./users'));
router.use('/members', require('./members'));
router.use('/notebooks', require('./notebooks'));
router.use('/notes', require('./notes'));
router.use('/trash', require('./trash'));
	
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
