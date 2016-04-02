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
var Promise = require('bluebird');

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

		var user1, notebook2, notes
		beforeEach('Create a user', function (done) {
			User.create(userInfo)
			.then(function (user) {
				user1 = user;
				return user.createNotebook({title: 'Another Notebook'})
			})
			.then(function(notebook) {
				notebook2 = notebook
				return Promise.all([notebook.createNote({subject: 'First note', tags: ['tag1', 'tag2']}),
							 notebook.createNote({subject: 'Second note'})
				])
			})
			.then(function(n) {
				notes = n
				done()
			})

		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('should get all notes for a user', function(done) {
			loggedInAgent.get('/api/notes').expect(200).end(function(err, response) {
				if (err) return done(err);
					expect(response.body).to.be.an('array');
					expect(response.body.length).to.equal(2);
					expect(response.body[0].subject).to.equal('First note');
					expect(response.body[1].subject).to.equal('Second note');
					done()
			})
		})

		it('should get one note', function(done) {
			loggedInAgent.get('/api/notes/' + notes[0]._id ).expect(200).end(function(err, response) {
				if (err) return done(err);
					expect(response.body).to.be.an('object');
					expect(response.body.subject).to.equal('First note');
					done()
			})
		})

		it('should  update one note', function(done) {
			loggedInAgent.put('/api/notes/' + notes[0]._id ).send({subject: "First note updated", body: "this is the updated body of the first note"}).expect(200).end(function(err, response) {
				if (err) return done(err);
					expect(response.body).to.be.an('object');
					expect(response.body.subject).to.equal('First note updated');
					expect(response.body.body).to.equal('this is the updated body of the first note');
					done()
			})
		})


		it('should  add a tag to a note', function(done) {
			loggedInAgent.post('/api/notes/' + notes[0]._id + '/tags').send({tag: 'test'}).expect(200).end(function(err, response) {
				if (err) return done(err);
					expect(response.body.tags.length).to.equal(3);
					expect(response.body.tags[2]).to.equal('test');
					done()
			})
		})

		it('should  remove a tag from a note', function(done) {
			loggedInAgent.put('/api/notes/' + notes[0]._id + '/tags').send({tag: 'test'}).expect(200).end(function(err, response) {
				if (err) return done(err);
					expect(response.body.tags.length).to.equal(2);
					expect(response.body.tags[1]).to.equal('tag2');
					done()
			})
		})

		it('should trash a note', function (done) {
			loggedInAgent.put('/api/notes/' + notes[0]._id + '/trash/add').expect(200).end(function(err, response) {
				if(err) return done(err);
				expect(response.body.trash).to.equal(true)
				done()
			})
		})

		it('should remove note from trash', function (done) {
			loggedInAgent.put('/api/notes/' + notes[0]._id + '/trash/remove').expect(200).end(function(err, response) {
				if(err) return done(err);
				expect(response.body.trash).to.equal(false)
				done()
			})
		})

	});

});












