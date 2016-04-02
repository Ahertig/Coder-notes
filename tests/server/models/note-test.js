var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');

// Require in all models.
require('../../../server/db/models');

var User = mongoose.model('User');
var Notebook = mongoose.model('Notebook');
var Note = mongoose.model('Note');

describe('Note model', function () {
	beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Note).to.be.a('function');
    });

    describe('Hooks',function(){
    	var user, notebook;
    	var  createNote = function (){
           return Note.create({
			"subject": "Express Tips and Tricks",
			"body": "**nodemon** is a useful package to auto-restart node server!",
			"size": 50,
			"tags": ["express","javascript"]
		   })
       };
       var createNotebook = function (){
           return Notebook.create({
			"title": "Express"
		   });
       	};
       	 var createUser = function () {
                return User.create({ email: 'gracehopper@gmail.com', password: 'gracehopper' });
            };
       };

});
 