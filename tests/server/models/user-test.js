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

describe('User model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(User).to.be.a('function');
    });

    describe('password encryption', function () {

        describe('generateSalt method', function () {

            it('should exist', function () {
                expect(User.generateSalt).to.be.a('function');
            });

            it('should return a random string basically', function () {
                expect(User.generateSalt()).to.be.a('string');
            });

        });

        describe('encryptPassword', function () {

            var cryptoStub;
            var hashUpdateSpy;
            var hashDigestStub;
            beforeEach(function () {

                cryptoStub = sinon.stub(require('crypto'), 'createHash');

                hashUpdateSpy = sinon.spy();
                hashDigestStub = sinon.stub();

                cryptoStub.returns({
                    update: hashUpdateSpy,
                    digest: hashDigestStub
                });

            });

            afterEach(function () {
                cryptoStub.restore();
            });

            it('should exist', function () {
                expect(User.encryptPassword).to.be.a('function');
            });

            it('should call crypto.createHash with "sha1"', function () {
                User.encryptPassword('asldkjf', 'asd08uf2j');
                expect(cryptoStub.calledWith('sha1')).to.be.ok;
            });

            it('should call hash.update with the first and second argument', function () {

                var pass = 'testing';
                var salt = '1093jf10j23ej===12j';

                User.encryptPassword(pass, salt);

                expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
                expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

            });

            it('should call hash.digest with hex and return the result', function () {

                var x = {};
                hashDigestStub.returns(x);

                var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

                expect(hashDigestStub.calledWith('hex')).to.be.ok;
                expect(e).to.be.equal(x);

            });

        });

        describe('on creation', function () {

            var encryptSpy;
            var saltSpy;

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            beforeEach(function () {
                encryptSpy = sinon.spy(User, 'encryptPassword');
                saltSpy = sinon.spy(User, 'generateSalt');
            });

            afterEach(function () {
                encryptSpy.restore();
                saltSpy.restore();
            });

            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser().then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
                    done();
                });
            });

            it('should set user.salt to the generated salt', function (done) {
               createUser().then(function (user) {
                   var generatedSalt = saltSpy.getCall(0).returnValue;
                   expect(user.salt).to.be.equal(generatedSalt);
                   done();
               });
            });

            it('should set user.password to the encrypted password', function (done) {
                createUser().then(function (user) {
                    var createdPassword = encryptSpy.getCall(0).returnValue;
                    expect(user.password).to.be.equal(createdPassword);
                    done();
                });
            });

        });

        describe('sanitize method', function () {

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            it('should remove sensitive information from a user object', function () {
                createUser().then(function (user) {
                    var sanitizedUser = user.sanitize();
                    expect(user.password).to.be.ok;
                    expect(user.salt).to.be.ok;
                    expect(sanitizedUser.password).to.be.undefined;
                    expect(sanitizedUser.salt).to.be.undefined;
                });
            });
        });
    });   

    describe('hooks', function(){
        var  createuser1 = function () {
            return User.create({ email: 'gracehopper@gmail.com', password: 'potus' })
        };
        var user1,  notebook1;

        beforeEach(function(done){
            createuser1()
            .then(function(_user1){
                user1 = _user1;
            })
            .then(function(){
                return Notebook.findById(user1.myNotebooks[0])
            })
            .then(function(_notebook1){
                notebook1 = _notebook1; 
                done(); 
            })
            .then(null, done);
        }) 
        afterEach(function(){
            User.remove();
            Notebook.remove();
        })
        it('should create first notebook when user is created', function(done){
            expect(user1.myNotebooks).to.have.length(1);
            expect(notebook1.title).to.equal('My First Notebook');
            done();
        });
    });

    describe('methods', function(){
        var  createuser = function () {
            return User.create({ email: 'gracehopper@gmail.com', password: 'potus' })
        };
        var user, notebook, trashnotebook, note1,note2
      
        beforeEach('create a user', function(done){
            createuser()
            .then(function(_user){
                user = _user;
                done();
            })
        });
        beforeEach('create the second notebook', function(done){
                User.findById(user._id)
                .then(function(user){
                    return user.createNotebook({title:'second notebook', trash: true})
                })
                .then(function(_notebook){
                    trashnotebook = _notebook;
                    done();
                }).then(null,done);
        });

        beforeEach('create notes to first notebook', function(done){
            Notebook.findById(user.myNotebooks[0])
            .then(function(_notebook){
                return Promise.all([_notebook.createNote({subject:'node',trash: true}), _notebook.createNote({subject:'angular', trash: false})])
            })
            .spread(function(_note1,_note2){
                note1 = _note1;
                note2 = _note2;
                done();
            }).then(null,done)
        })
        
        afterEach(function(){
            User.remove();
            Notebook.remove();
        })
    
        it('should create notebook', function(done){
             User.findById(user._id)
             .then(function(user){
                expect(user.myNotebooks.length).to.equal(2);
                done();
             })
        })
        it('should get trash notebooks', function(done){
            User.findById(user._id)
            .populate('myNotebooks')
            .then(function(user){
                return user.getNotebooksInTrash()
            })
            .then(function(trashnotebooks){
                expect(trashnotebooks[0]._id.toString()).to.equal(trashnotebook._id.toString());
                done();
            })
        })   
    })
});
