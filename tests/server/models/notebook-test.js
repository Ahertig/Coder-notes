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

describe('Notebook model', function () {

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

    describe('Hooks',function(){
    	var  createuser1 = function () {
            return User.create({ email: 'gracehopper@gmail.com', password: 'potus',myNotebooks:[],sharedWithMeNotebooks:[]})
        };
        var createNotebook1 = function(){
            return Notebook.create({title: 'javascript'});
        };
        var createNotebook2 = function(){
            return Notebook.create({title: 'node'});
        };
        var theuser, mynotebook,sharednotebook;

    	beforeEach('create a notebook', function(done){
            return Promise.all([createNotebook1(), createNotebook2()]) 
            .spread(function(_notebook1,_notebook2){
                mynotebook = _notebook1;
                sharednotebook = _notebook2;
                return createuser1();
            })
            .then(function(_user){
                _user.myNotebooks.push(mynotebook._id);
                _user.sharedWithMeNotebooks.push(sharednotebook._id);
                return _user.save()      
            })
            .then(function(updateUser){
                theuser = updateUser;
                done();
            })
            .then(null, done);
    	});
        afterEach(function(){
            User.remove();
            Notebook.remove();
        })

        describe('remove noteid from notebooks', function(){
            beforeEach(function(done){
                Notebook.findById(mynotebook._id)
                .then(function(thenotebook){
                    return thenotebook.remove();         
                })
                .then(function(){done();})
                .then(null, done);
            })

            
             it('should remove notebook id from user.myNotebooks array when a notebook is deleted', function(done){
                    User.findById(theuser._id)
                    .then(function(user){
                        expect(user.myNotebooks.length).to.equal(1); 
                        done();   
                    })
                    .then(null, done);

            })
        })
    })

    describe('Methos',function(){
        var  createuser = function () {
            return User.create({ email: 'gracehopper@gmail.com', password: 'potus',myNotebooks:[],sharedWithMeNotebooks:[]})
        };
        var createNotebook = function(){
            return Notebook.create({title: 'javascript'});
        };
        var theuser, mynotebook

        beforeEach('create a notebook', function(done){
            return createNotebook() 
            .then(function(_notebook){
                mynotebook = _notebook;
                done();
            })             
            .then(null, done);
        });
        beforeEach('create a user', function(done){
            return createuser()
            .then(function(_user){
                _user.myNotebooks.push(mynotebook._id);
                return _user.save()      
            })
            .then(function(updateUser){
                theuser = updateUser;
                done();
            })
            .then(null, done);
        });


        afterEach(function(){
            User.remove();
            Notebook.remove();
        })
        describe('get owner',function(){
            it('shoul find notebook Owner', function(done){
                Notebook.findById(mynotebook._id)
                .then(function(notebook){
                    return notebook.getOwner()
                })
                .then(function(user){
                    expect(user._id.toString()).to.equal(theuser._id.toString());
                    done();
                })
                .then(null, done)
            })
        })
        describe('createNote method',function(){
            var newNote;
            beforeEach(function(done){
                Notebook.findById(mynotebook._id)
                .then(function(notebook){
                    return notebook.createNote({subject:'ruby'});
                })
                .then(function(note){
                    newNote  = note;
                    done();
                })
            })
            afterEach(function(done){
                Notebook.remove({_id:mynotebook._id})
                .then(function(){
                    done();
                })
            })
            it('shoul create note and add Note Id to Notebook', function(done){
                Notebook.findById(mynotebook._id)
                .then(function(notebook){
                    expect(notebook.notes.length).to.equal(1);
                    expect(notebook.notes).to.include.members([newNote._id.toString()]);
                    done();
                })
                .then(null, done)
            })
        })
        describe('sahre', function(done){
            var shareUser;
            beforeEach(function(done){
                User.create({ email: 'fsa@gmail.com', password: 'potus',myNotebooks:[],sharedWithMeNotebooks:[]
                })
                .then(function(_user){
                    done();
                }).then(null, done)
            });
            beforeEach(function(done){
                Notebook.findById(mynotebook._id)
                .then(function(notebook){
                    return notebook.share('fsa@gmail.com')
                })
                .then(function(user){
                    shareUser = user;
                    done();
                })
                .then(null, done)
            });
            

            it('shoul share a notebook with other users', function(done){
                    expect(shareUser.sharedWithMeNotebooks.length).to.equal(1)
                    expect(shareUser.sharedWithMeNotebooks[0].toString()).to.equal(mynotebook._id.toString())
                    done(); 
            })

            it('shoul finish sharing notebook', function(done){
                    Notebook.findById(mynotebook._id)
                    .then(function(notebook){
                        return notebook.removeShare('fsa@gmail.com')
                    })
                    .then(function(_notebook){
                        return User.findById(shareUser._id)
                    })
                    .then(function(user){
                        expect(user.sharedWithMeNotebooks.length).to.equal(0);
                    done(); 
                    }).then(null, done);    
            })
        })
        describe('trash', function(){
            var trashNotebook;
            beforeEach('add notes to notebook', function(done){
                Notebook.findById(mynotebook._id)
                .then(function(notebook){
                    return Promise.all([notebook.createNote({subject:'node'}), notebook.createNote({subject:'angular'})])
                })
                .then(function(){
                    done();
                })
                .then(null, done)
            })

            beforeEach(function(done){
                Notebook.findById(mynotebook._id)
                .populate('notes')
                .then(function(notebook){
                   return notebook.addToTrash()
                })
                .then(function(_notebook){
                    trashNotebook = _notebook;
                    done();
                })
                .then(null, done)
            })

            it('shoul trash all notes when trash a notebook', function(done){
                expect(trashNotebook.notes[0].trash).to.equal(true)
                expect(trashNotebook.notes[1].trash).to.equal(true)
                done();
            })
            it('should untrash all notes when untrash notebook', function(done){
                Notebook.findById(mynotebook._id)
                .populate('notes')
                .then(function(notebook){
                   return notebook.removeFromTrash()
                })
                .then(function(untrashNotebook){
                    expect(untrashNotebook.notes[0].trash).to.equal(false)
                    expect(untrashNotebook.notes[1].trash).to.equal(false)
                    done();
                })
            })       
        })
    })
})