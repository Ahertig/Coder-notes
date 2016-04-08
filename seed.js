var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Note = Promise.promisifyAll(mongoose.model('Note'));
var Notebook = Promise.promisifyAll(mongoose.model('Notebook'));

var Notes = require('./fakedata/notes.js')
var Notebooks = require('./fakedata/notebook.js')
var Users = require('./fakedata/users.js')

var seedNotes = function () {
    return Note.createAsync(Notes);
};

var seedNotebooks = function () {
    return Notebook.createAsync(Notebooks);
};
var seedUsers = function () {
    return User.createAsync(Users);
};

var notesDB,notebookDB,userDB;
connectToDb
.then(function() {
    return Promise.all([User.remove({}), Notebook.remove({}), Note.remove({})])
})
.then(function () {
    for (var i = 0 ; i < Notes.length; i++) {
        if (i % 2 === 0  && i > 0) Notes[i].type = 'public';
    }
    Note.findAsync({})
    .then(function (notes) {
        if (notes.length === 0) {
            return seedNotes();
        } else {
            console.log(chalk.magenta('Seems to already be note data, exiting!'));
        }
    })
    .then(function (notes) {
            Notebooks[0].notes=[notes[0]._id,notes[1]._id]
            Notebooks[1].type = 'public'
            Notebooks[1].notes=[notes[2]._id,notes[3]._id,notes[4]._id];
            Notebooks[2].notes = [notes[5]._id];
            Notebooks[2].type ='public'
            Notebooks[3].notes = [notes[6]._id,notes[7]._id]
            Notebooks[4].notes = [notes[8]._id];    
        return seedNotebooks();
    })
    .then(function(notebooks){
            Users[0].myNotebooks = [notebooks[0]._id,notebooks[1]._id,notebooks[2]._id,notebooks[3]._id,notebooks[4]._id]
        
        return seedUsers();
    })
    .then(function(){
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(0);
    });
});
