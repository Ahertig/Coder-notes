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
    subject: {
        type: String,
        default: 'Untitled'
    }, 
    body: {
        type: String
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String]
    },
    trash: {type: Boolean,
        default: false
    }
});


// noteSchema.post('save', function() {
//   return this.set({lastUpdate: new Date()}).save();
// });

// Removing note from Notebook.notes
noteSchema.pre('remove', function(next) {
    mongoose.model('Notebook')
        .findOneAndUpdate(
            {notes: {$elemMatch: {$eq : this._id}}},{$pull: {notes: this._id}})
        .exec()
        .then(function(){
            next();
        }, next);
})

noteSchema.post('save', function(next) {
    if(this.trash !== true){
        return mongoose.model('Notebook')
        .findOneAndUpdate(
            {notes: {$elemMatch: {$eq : this._id}}},{$set: {date: this.lastUpdate}},{new: true})
        .then(function(notebook){
        }, function(err){console.log("Error: ", err)});
    }
})

noteSchema.methods.addTag = function(tag) {
    this.tags.addToSet(tag)
    return this.save()
}

noteSchema.methods.removeTag = function(tag) {
  this.tags.pull(tag)
  return this.save()
}

noteSchema.methods.addToTrash = function() {
    this.set({trash: true})
    return this.save()
}

noteSchema.methods.removeFromTrash = function() {
    this.set({trash: false})
    return this.save()
}
noteSchema.methods.deleteTrash = function() {
    var note = this;
    return this.remove()
    .then(function(){
        return note;
    })    
}

mongoose.model('Note', noteSchema);















