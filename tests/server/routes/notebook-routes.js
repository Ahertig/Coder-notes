// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Notebook = mongoose.model('Notebook');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Notebook Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

		var user1
		beforeEach('Create a user', function (done) {
			User.create(userInfo)
			.then(function (user) {
				user1 = user;
				return user.createNotebook({title: 'Another Notebook'})
			})
			.then(function(notebook) {
				return notebook.createNote({subject: 'First note'})
			})
			.then(function(note) {
				done()
			})

		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should get all notebooks for a user', function (done) {
			loggedInAgent.get('/api/notebooks').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				expect(response.body.length).to.equal(2);
				expect(response.body[1].title).to.equal('My First Notebook');
				expect(response.body[0].title).to.equal('Another Notebook');
				done();
			})
		})

		it('should create  a notebook', function (done) {
			loggedInAgent.post('/api/notebooks').send({title: 'My Second Notebook'}).expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('object');
				expect(response.body.title).to.equal('My Second Notebook');
				done();
			});
		})

		it('should get one notebook', function (done) {
			loggedInAgent
			.get('/api/notebooks/' + user1.myNotebooks[0]).expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('object');
				expect(response.body.title).to.equal('My First Notebook');
				done();
			});
		})


		it('should create a note in one notebook', function (done) {
			loggedInAgent
			.post('/api/notebooks/' + user1.myNotebooks[0] + '/notes').send({subject: 'My first note'}).expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('object');
				expect(response.body.subject).to.equal('My first note');
				done();
			})
		})

		it('should get all notes in notebook', function (done) {
			loggedInAgent
			.get('/api/notebooks/' + user1.myNotebooks[1] + '/notes').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				expect(response.body.length).to.equal(1);
				expect(response.body[0].subject).to.equal('First note')
				done();
			})
		})



	});

});






















