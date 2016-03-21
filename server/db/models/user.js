'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

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

// userSchema.plugin(require('mongoose-lifecycle'));
// userSchema.on('beforeInsert', function(user) {
//     console.log('user before insert: ', user)
//     mongoose.model('Notebook').create({
//         title: 'My Notebook'
//     })
//     .then(function(notebook) {
//         console.log('notebook: ', notebook)
//         thisUser.myNotebooks.push(notebook._id)
//         thisUser.save()
//     })

// })

// userSchema.methods.getAllNotes = function() {
//     this.populate('myNotebooks')
//     console.log(this)
//     return this;
// }

//ZS:  return thisUser.save() if return a instanse, it can't chain after that. 
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
