'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Promise = require('bluebird');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Github = require('github'); 

var userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true //,
     // required: true
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
        id: String, 
        email: String,
        token: String
    },
    github: {
        id: String, 
        token: {type: String, select: false}
    }
});

userSchema.plugin(deepPopulate);

userSchema.virtual('allNotebooks').get(function() {
    return this.myNotebooks.concat(this.sharedWithMeNotebooks)
});


userSchema.pre('save', function(next) {
    var thisUser = this; 
    if (this.myNotebooks.length === 0) {
        mongoose.model('Notebook').create({title: 'My First Notebook'})
        .then(function(notebook) {
            thisUser.myNotebooks.push(notebook._id)
            return thisUser.save();
        })
        .then(function() { next() }, next);
    }
    else next();
})

//check later
// userSchema.post('remove', function(doc) {
//     Promise.map(doc.myNotebooks, function(notebook) {
//         console.log('doc', doc);
//         return notebook.remove();
//     })       
// })

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }
    next();

});

userSchema.methods.createNotebook = function(body) {
   var thisUser = this;
   var notebook;
   return mongoose.model('Notebook').create(body)
   .then(function(_notebook) {
        notebook = _notebook
        thisUser.myNotebooks.push(notebook._id);
        return thisUser.save();       
   })
   .then(function(){
        return notebook;
   })
}
userSchema.methods.getNotebooksInTrash = function() {
    var res = _.filter(this.myNotebooks, {trash: true})
    return res
}

userSchema.methods.getTrash = function () {
    var notes, notebooks;
    var self = this;
    return self.getNotesInTrash()
    .then(function(trashnotes) {
        notes = trashnotes
        return notes;
    })
    .then(function(notes) {
        notebooks = self.getNotebooksInTrash()
        return notebooks
    })
    .then(function(notebooks) {
        return notebooks.concat(notes)
    })
}

userSchema.methods.clearTrash = function() {
    return this.getTrash()
    .then(function(result) {
        return Promise.map(result, function(item) {
            return item.remove()
        })
    })
}
userSchema.methods.getNonTrashNotes = function(tags) {
    return this.getAllNotes(tags)
    .then(function(notes) {
        return _.filter(notes, {trash: false})
    })
}

userSchema.methods.getNotesInTrash = function(tags) {
    return this.getAllNotes(tags)
    .then(function(notes) {
        return _.filter(notes, {trash: true})
    })
}

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
       return mongoose.model('Note').find({
            _id: {
                $in: arrayOfNoteIds
            }, 
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

function makePromisifiedGithubClient() {
  var client = new Github({
    version: "3.0.0"
  })

  for(var key in client) {
    if(client.hasOwnProperty(key) && typeof client[key] === 'object' && !Array.isArray(client[key])) {
      Promise.promisifyAll(client[key])
    }
  }

  return client;
}


userSchema.methods.getGithubClientSync = function() {
  if (!this.github.token) return Promise.reject("no access token")
  var client = makePromisifiedGithubClient()
  client.authenticate({
    type: 'oauth',
    token: this.github.token
  })

  return client; 
}


userSchema.methods.getGithubClient = function() {
  return mongoose
    .model('User')
    .findById(this._id)
    .select('+github.token')
    .exec()
    .then(function(u) { 
      return u.getGithubClientSync()
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




userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});


mongoose.model('User', userSchema);
