'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var noteSchema = new mongoose.Schema({
    type:  { 
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    },
    state: {
        type: String // saved, trash 
    },
    subject: {
        type: String 
    }, 
    body: {
        type: String
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    },
    size: {
        type: Number
    },
    lastUpdate: {
        type: Date, 
        default: Date.now
    },
    tags: {
        type: [String]
    }
});

mongoose.model('Note', noteSchema);