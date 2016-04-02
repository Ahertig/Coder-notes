// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var User = mongoose.model('User');
// var Notebook = mongoose.model('Notebook');

// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var supertest = require('supertest');
// var app = require('../../../server/app');

// describe('Notebook Route', function () {

// 	beforeEach('Establish DB connection', function (done) {
// 		if (mongoose.connection.db) return done();
// 		mongoose.connect(dbURI, done);
// 	});

// 	afterEach('Clear test database', function (done) {
// 		clearDB(done);
// 	});

// 	describe('Authenticated request', function () {

// 		var loggedInAgent;

// 		var userInfo = {
// 			email: 'joe@gmail.com',
// 			password: 'shoopdawoop'
// 		};

// 		var user1
// 		beforeEach('Create a user', function (done) {
// 			User.create(userInfo)
// 			.then(function (user) {
// 				user1 = user;
// 				done()
// 			})
// 		});

// 		beforeEach('Create loggedIn user agent and authenticate', function (done) {
// 			loggedInAgent = supertest.agent(app);
// 			loggedInAgent.post('/login').send(userInfo).end(done);
// 		});



// 	});

// });
