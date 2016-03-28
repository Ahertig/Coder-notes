// Route api/
'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var github = require('github')

router.post('/createGist', function(req, res, next) {
	req.user.getGithubClient()
	.then(function (client) {
		return client.gists.createAsync(req.body)
	})
	.then(function(){
		res.sendStatus(200)
	})
	.then(null, next)
})



router.use('/users', require('./users.js'))
router.use('/myaccount', require('./user.js'));
router.use('/tags', require('./user.tags.js'));
