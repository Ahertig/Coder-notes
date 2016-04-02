// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('User Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Unauthenticated request', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should create a user', function (done) {
		guestAgent.post('/api/users').send({email: 'test@test.com', password: 'password'})
			.expect(200)
			.end(done);
		});

	});

	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

		var user;
		beforeEach('Create a user', function (done) {
			User.create(userInfo)
			.then(function (u) {
				user = u;
				done()
			})
			// .then(null, done)
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should get one user', function (done) {
			loggedInAgent.get('/api/myaccount').expect(200).end(function (err, response) {
				if (err) return done (err);
				expect(response.body).to.be.an('object');
				expect(response.body.email).to.equal('joe@gmail.com');
				expect(response.body.password).not.to.equal('shoopdawoop');
				done();
			});
		});

	});

});





