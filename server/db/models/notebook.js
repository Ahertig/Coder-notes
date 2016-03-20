'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var notebookSchema = new mongoose.Schema({
    type:  { 
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    }, 
    title: {
        type: String,
        default: 'My Notebook', // + Date.now.toString()
        required: true
    }, 
    date: {
        type: Date, 
        default: Date.now
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]

});

// Removing notebook from user.myNotebooks
notebookSchema.post('remove', function() {
    return mongoose.model('User')
        .findOneAndUpdate(
            {myNotebooks: {$elemMatch: {$eq : this._id}}},
             {$pull: {myNotebooks: this._id}})
        .exec();
})

// Removing notebook from user.sharedWithMeNotebooks - not tested!
notebookSchema.post('remove', function() {
    return mongoose.model('User')
        .findOneAndUpdate(
            {sharedWithMeNotebooks: {$elemMatch: {$eq : this._id}}},
             {$pull: {sharedWithMeNotebooks: this._id}})
        .exec();
})

notebookSchema.methods.getOwner = function() {
    return mongoose.model('User')
        .findOne({myNotebooks: {$elemMatch: {$eq : this._id} } }).exec();
}

notebookSchema.methods.createNote = function(body) {
    var notebook = this;
    return mongoose.model('Note').create(body)
    .then(function(note) {
        notebook.notes.push(note._id)
        notebook.save();
        return note;
    })
}

notebookSchema.methods.share = function(userEmail) {
    var thisNotebook = this;
    return mongoose.model('User').findOne({email: userEmail})
    .then(function (user) {
        user.sharedWithMeNotebooks.push(thisNotebook._id)
        user.save();
        return thisNotebook;
    })
}

mongoose.model('Notebook', notebookSchema);









