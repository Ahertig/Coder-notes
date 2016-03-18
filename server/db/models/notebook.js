'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Note = mongoose.model('Note');

var notebookSchema = new mongoose.Schema({
    type:  { 
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    }, 
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    date: {
        type: Date, 
        default: Date.now
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes'
    }]

});

notebookSchema.methods.addNote = function(body) {
    var notebook = this
    return mongoose.model('Note').create(body)
    .then(function(note) {
        notebook.notes.push(note._id)
        return notebook.save();
    })
}

mongoose.model('Notebook', notebookSchema);