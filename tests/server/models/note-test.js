var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
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

    describe('Hooks',function () {
        var notebook = {title: "Express",notes:[]};
    	var note = {subject: "Express Tips and Tricks", body: "**nodemon** is a useful package to auto-restart node server!",size: 50,tags: ["express","javascript"]}; 
        var theNotebook, theNote;
        beforeEach(function(){
            Note.create(note)
            .then(function(_note){
                theNote = _note;
                notebook.notes.push(_note.id);
                return Notebook.create(notebook);
            })
            .then(function(_notebook){
                theNotebook = _notebook;
            })
            .then(null, function(err){console.log("Error:", err)});
        })
        afterEach(function(){
            Notebook.remove();
            Note.remove();
        })
        describe('Pre remove', function(){ 
            it('should remove noteId from myNotebooks list before remove the note', function(done){
                Note.findById(theNote._id)
                .then(function(note){
                    return note.remove()    
                })
                .then(function(){
                    return Notebook.findById(theNotebook._id)
                })
                .then(function(notebook){
                    expect(notebook.notes.length).to.equal(0);
                    done();
                })
                .then(null,done)
            })
        });
        describe('Post save',function(){
            it('should set note lastUpdate to notebook date', function(done){
                var updateNote;
                Note.findById(theNote._id)
                .then(function(note){
                    note.lastUpdate = Date.now()
                    return note.save()
                })
                .then(function(note){
                    updateNote = note;
                    return Notebook.findById(theNotebook._id)    
                })
                .then(function(notebook){
                    expect(notebook.date.toString()).to.equal(updateNote.lastUpdate.toString());
                    done();
                })
                .then(null, done)
            })
        })


    });
    
    describe('Methods',function (){
        var note = {subject: "Express Tips and Tricks", body: "**nodemon** is a useful package to auto-restart node server!",tags: ["express","javascript"],trash: false}; 
        var theNote;
        afterEach(function(){
                Note.remove();
        })

        describe('Tags',function(){
            
            beforeEach(function(done){
                Note.create(note)
                .then(function(_note){
                    theNote = _note;
                    done();
                })
                .then(null, done);
            })
            
            it('should save duplicate tags only once', function(done){
                var updateNote;               
                Note.findById(theNote._id)
                .then(function(note){ 
                    return Promise.all([note.addTag("Programming"), note.addTag("Programming")]);
                })
                .then(function(){
                    return Note.findById(theNote._id)   
                })
                .then(function(newNote){
                    expect(newNote.tags.length).to.equal(3);
                    expect(newNote.tags.toString()).to.equal(["express","javascript","Programming"].toString());
                    done();
                })
                .then(null, done);
            })

            it('should remove a tag from tags list only if it is exist', function(done){
                Note.findById(theNote._id)
                .then(function(note){
                    return Promise.all([note.removeTag("Programming"), note.removeTag("Programming")]);
                })
                .then(function(){
                    return Note.findById(theNote._id);
                })
                .then(function(newNote){
                    expect(newNote.tags.length).to.equal(2);
                    expect(newNote.tags.toString()).to.equal(["express","javascript"].toString());
                    done();
                })
                .then(null, done)
            })
        })
        
        describe('Trash', function(){

            it('addToTrash should set a note as trash', function(done){

                Note.create(note)
                .then(function(_note){
                     return _note.addToTrash();
                })
                .then(function(trashNote){
                    expect(trashNote.trash).to.equal(true);
                    done();
                })
                .then(null, done);
            })

            it('removeFromTrash should set note.trash false', function(done){
                note.trash = false;
                Note.create(note)
                .then(function(_note){
                     return _note.removeFromTrash();
                })
                .then(function(note){
                    expect(note.trash).to.equal(false);
                    done();
                })
                .then(null, done);
            })

            it('deleteTrash should delete note permanantly', function(done){
                Note.create(note)
                .then(function(note){
                        theNote = note;
                        return note.deleteTrash()
                })
                .then(function(deletenote){
                    expect(deletenote).to.deep.equal(theNote);
                    return Note.findById(theNote._id)
                })
                .then(function(note){
                    expect(note).to.equal(null);
                    done();
                })
                .then(null, done);
            })

        })
    })
});
 