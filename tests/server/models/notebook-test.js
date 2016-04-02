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

xdescribe('Notebook model', function () {

	 beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Notebook).to.be.a('function');
    });

    xdescribe('Hooks',function(){
    	var user, notebook;
    	var  createuser1 = function () {
            	return User.create({ email: 'gracehopper@gmail.com', password: 'potus' })
        	};

    	beforeEach('create a notebook', function(done){
    		//var newuser = new User()
            createuser1()
        // 	.then(function(_user){
        // 		user = _user;
        // 		console.log("user mynotebooks",user.myNotebooks);
        // 		return _user.createNotebook({title: 'new notebook'});
        // 	})
        // 	.then(function(_notebook){
      		// notebook = _notebook;
        // 	})
        // 	.then(function(){
        // 		return Notebook.remove({_id: notebook._id});
        
        // 	})
        // 	.then(function(notebook){
        // 		done();
        // 	})
        // 	.then(null, done)
    	});

        it('should remove notebook id from user.myNotebooks array when a notebook is deleted',function(){
        		// Notebook.remove({_id: notebook._id})
        		// .then(function(){	
        		// 	console.log("user",user._id);
        		// 	return User.find()
        		// })
        		// .then(function(user){
        		// 	console.log("user returned",user)
        		// 	expect(user.myNotebooks.length).to.equal(1);		
        		// })
       			 User.findById(user._id)
       			 .then(function(user){
       			  	console.log("user", user);
       			 	expect(user.myNotebooks.length).to.equal(1);
       			 })

        })
    })
})