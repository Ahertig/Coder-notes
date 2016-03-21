'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Promise = require('bluebird');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    myNotebooks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Notebook'
    }],
    sharedWithMeNotebooks:  [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Notebook'
    }],
    salt: {
        type: String
    },
    google: {
        id: String
    }, 
    github: {
        id: String
    }
});


userSchema.pre('save', function(next) {
    var thisUser = this; 
    if (this.myNotebooks.length === 0) {
        return mongoose.model('Notebook').create({title: 'My First Notebook'})
        .then(function(notebook) {
            thisUser.myNotebooks.push(notebook._id)
            return thisUser.save();
        })
        .then(function() {
            next()
        })
    }
    next()
})


userSchema.post('remove', function(doc, next) {
    return Promise.map(doc.myNotebooks, function(notebook) {
        return mongoose.model('Notebook').remove({_id: notebook._id}).exec()
    })
    .then(function() {
        next()
    })
})

// userSchema.methods.getAllNotes = function() {
//     var multidimensionalArrayOfNodeIds = [], 
//         arrayOfNoteIds = [], 
//         multidimensionalArrayOfTags = [], 
//         arrayOfTags = [];

//     multidimensionalArrayOfNodeIds = this.myNotebooks.map(function(element) { 
//         return element.notes 
//     })

//     arrayOfNoteIds = multidimensionalArrayOfNodeIds.reduce(function(a, b) {
//          return a.concat(b);
//         });

//    return mongoose.model('Note').find({
//         _id: {
//             $in: arrayOfNoteIds
//         }
//     })
// }

userSchema.methods.getAllNotes = function(tags) {
    var multidimensionalArrayOfNodeIds = [], 
        arrayOfNoteIds = [], 
        multidimensionalArrayOfTags = [], 

    multidimensionalArrayOfNodeIds = this.myNotebooks.map(function(element) { 
        return element.notes 
    })

    arrayOfNoteIds = multidimensionalArrayOfNodeIds.reduce(function(a, b) {
         return a.concat(b);
        });

    var tagsArr = [];
    for(var tag in tags) {
        tagsArr.push(tags[tag]);
    }

    if(!tagsArr.length) {
       console.log(arrayOfNoteIds, tagsArr)
       return mongoose.model('Note').find({
            _id: {
                $in: arrayOfNoteIds
            }
        })       
    } else {

        return mongoose.model('Note').find({
            _id: {
                $in: arrayOfNoteIds
            }, 
            tags: {
                $all: tagsArr
            }
        })       
    }
}

userSchema.methods.createNotebook = function(body) {
   var thisUser = this;
   return mongoose.model('Notebook').create(body)
   .then(function(notebook) {
        thisUser.myNotebooks.push(notebook._id)
        thisUser.save()
        return notebook;
   })
}

// method to remove sensitive information from user objects before sending them out
userSchema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }
    next();

});


userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});


mongoose.model('User', userSchema);
