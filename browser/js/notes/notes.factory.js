app.factory('NotesFactory', function($http, $rootScope, $q) {

	var NotesFactory = {},
		notesCache = [],
		notebookCache = [],
		sharedNotebookCache = [],
		tagsCache = [], 
		currentNote,
		currentNotebook,
		sideNavOpen = true;
	
	NotesFactory.getCurrentNote = function() {
		if(currentNote) {
			return currentNote;
		}
		else {
			currentNote = {};
			return NotesFactory.getCurrentNotebook()
			.then(function(currentNotebook){
				angular.copy(currentNotebook.notes[0], currentNote);
				return currentNote;
			})
		}
	}
	NotesFactory.setCurrentNote = function(_currentNote) {
		currentNote = _currentNote;
		// console.log("this is factory currentNote ", currentNote);
	}
	NotesFactory.getCurrentNotebook = function() {
		if(currentNotebook){
			return $q.resolve(currentNotebook);
		}
		else {
			currentNotebook = {};
			return NotesFactory.fetchMyNotebooks()
					.then(function(notebooks) {
						angular.copy(notebooks[0], currentNotebook);
				// console.log("set current notebook initially to", currentNotebook)
				return currentNotebook;	
			})
		}
	}

	NotesFactory.setCurrentNotebook = function(_currentNotebook) {
		currentNotebook = _currentNotebook;
		// console.log("this is factory currentNotebook ", currentNotebook);
	}
    
    NotesFactory.getAllCacheNotes = function(){
    	return notesCache;
    }
    NotesFactory.getTagsCache = function() {
		return tagsCache;
	}
	NotesFactory.updateTagsCache = function(tag, action) {	
 		var index = NotesFactory.getIndex(tag);
		if(action == 'add'){
			if (index === -1) {
				tagsCache.unshift({tag:tag, count:1});
			}
			else {
				tagsCache[index].count += 1;
			}

		}
		else if(action == 'delete') {
			if (tagsCache[index].count > 1) {
				tagsCache[index].count -= 1;
			}
			else { 
				tagsCache.splice(index,1);
			}	
		}
		console.log("tags cache is now", tagsCache)
	}

	NotesFactory.getIndex = function(tag) {
			for (var i = 0; i < tagsCache.length; i++) {
				if(tagsCache[i].tag === tag) {
					return i;
				}
			}
			return -1;
	}
   
	NotesFactory.getCachedNotebooks = function() {
		return notebookCache;
	}
    
    NotesFactory.updateNoteInNotebookCache = function(notebookID, note, action){
    	var notebook = NotesFactory.findNotebookById(notebookID); 
    	
 		if(action === 'add'){ 
         	notebook.notes.unshift(note);         	
 		}
 		else if(action === 'update'){
 			var index = NotesFactory.findNoteIndex(notebook,note._id);
 			angular.copy(note,notebook.notes[index]);
 		}
 		else if(action === 'delete'){
 			var index = NotesFactory.findNoteIndex(notebook,note._id);
 			notebook.notes.splice(index,1)
 		}
	}
    // this is to add/ update/ delete notebooks 
	 NotesFactory.updateNotebookCache = function(notebook, action) {

        if(action === 'add'){ 
         	notebookCache.unshift(notebook);         	
 		}
 		else if(action === 'update'){
 			var oldNotebook = NotesFactory.findNotebookById(notebook._id);
 			angular.copy(notebook,oldNotebook);
 		}
 		else if(action === 'delete'){
 			var index = NotesFactory.findNotebookIndex(notebook._id);
 			notebookCache.splice(index,1);
 		}
	}

	NotesFactory.findNotebookById = function(notebookId) {
		for (var i = 0; i < notebookCache.length; i++) {
			if(notebookId == notebookCache[i]._id) {
				return notebookCache[i];
			}
		}
	}
	NotesFactory.findNotebookIndex = function(notebookId) {
		for (var i = 0; i < notebookCache.length; i++) {
			if(notebookId == notebookCache[i]._id) {
				return i;
			}
		}
	}

 //    NotesFactory.findNoteById = function(notebook, noteId) {
	// 	for (var i = 0; i < notebook.notes.length; i++) {
	// 		if(noteId == notebook.notes[i]._id) {
	// 			return notebook.notes[i];
	// 		}
	// 	}
	// }


    
     NotesFactory.findNoteIndex = function(notebook, noteId) {
		for (var i = 0; i < notebook.notes.length; i++) {
			if(noteId == notebook.notes[i]._id) {
				return i;
			}
		}
	}


	// This function is working!
	NotesFactory.fetchMyNotebooks = function() {
		return $http.get('/api/notebooks')
		.then(function(response) {
			angular.copy(response.data, notebookCache);
			return notebookCache;
		}, function(err) {
			console.log("failed get all notebooks",err);
		})
	}

    //!!!this is to be updated! 
	NotesFactory.fetchMySharedNotebooks = function() {
		return $http.get('/api/notebooks/shared')
		.then(function(response) {
			angular.copy(response.data, sharedNotebookCache);
			return sharedNotebookCache;
		}, function(err) {
			console.log("shared note failed!")
		})
	}

	NotesFactory.fetchMyNotes = function() {
		
		return NotesFactory.fetchMyNotebooks()
		.then(function(notebookCache){
			// console.log("notebookCache,", notebookCache);
		for (var i = 0; i < notebookCache.length; i++) {
			notesCache = notesCache.concat(notebookCache[i].notes);
		}
			return notesCache;
		})
	}

	NotesFactory.fetchPublicNotes = function() {
    return $http.get('/api/public/notes/all')
    .then(function(response) {
        return response.data;
    })
  }

	// this function is working!
	NotesFactory.fetchMyTags = function() {
		return $http.get('/api/tags')
		.then(function(response) {
			angular.copy(response.data, tagsCache);
			// console.log('tagsCache',tagsCache);
			return tagsCache;
		}, function(err) {
			console.error("could not fetch tags for user",userId)
		})	
	}

	// can we store current note on NotesFactory.currentNote?
	NotesFactory.getNote = function (noteId) {
		return $http.get('/api/notes/' + noteId)
		.then(function(response) {
			// console.log("I just got note", response.data)
			return response.data;
		}, function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.saveNote = function (notebookId, noteId,noteUpdate) {
		console.log("* NotesFactory saveNote. NotebookId, ", notebookId, "noteUpdate", noteUpdate);
		return $http.put('/api/notes/' + noteId, noteUpdate)
		.then(function(response) {
			NotesFactory.updateNoteInNotebookCache(notebookId,response.data,'update');
			console.log("* NotesFactory.saveNote: response data is", response.data)
			return response.data;
		},
		function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.newNote = function (notebookId) {
		return $http.post('/api/notebooks/' + notebookId + '/notes')
		.then(function(response) {
			console.log("* NotesFactory - I just created a new note", response.data)
            NotesFactory.updateNoteInNotebookCache(notebookId, response.data, 'add');
			return response.data;
		}, 
		function(err) {
			console.error("could not create note", err)
		})	
	}

	NotesFactory.newNotebook = function(title) {
		// var index = -1;
		// for (var i = 0; i < notebookCache.length; i++) {
		// 	console.log("title",notebookCache[i].title,title)
		// 	if(notebookCache[i].title === title) {
		// 		//console.log("title",notebookCache[i].title,title)
		// 		index =  i;
		// 	}	
		// }
		// if(index > -1){ 
		// 	throw new Error("you already have this title!");
		// }
		return $http.post('/api/notebooks/', {title: title})
		.then(function(response) {
			NotesFactory.updateNotebookCache(response.data,'add');
			return response.data;
		},
		function(err) {
			console.error("could not create notebook", err)
		})

	}
	NotesFactory.removeNotebook = function(notebook){
		return $http.put('/api/notebooks/' + notebook._id + '/trash/add')
		.then(function(response){
			NotesFactory.updateNotebookCache(response.data,'update');
		})
		.then(null, function(err){
			console.log("remove notebook failed", err);
		})
	}
 
 //this is not consitant with how back-end dealing with trash note. 
 //when trash note-> set note.trash = true but not removing from notebook
 //remove from notebook only if when we delete the note from trash 
	// NotesFactory.trashNote = function(noteId) {
	// 	console.log("inside NotesFactory.trashNote",noteId)
	// 	return $http.put('/api/notes/' + noteId + '/trash/add')
	// 	.then(function(response) {
	// 		console.log('response from server', response.data._id )
	// 		for (var i = 0; i < notebookCache.length; i++) {
	// 			console.log('getting into first loop.')
	// 			for (var j = 0; j < notebookCache[i].notes.length; j++) {
	// 				console.log('getting into second loop. note ids: ', notebookCache[i].notes[j]._id)
	// 				if (notebookCache[i].notes[j]._id === response.data._id) {
	// 					console.log('it matches!')
	// 					notebookCache[i].notes.splice(j, 1);
	// 				}
	// 			}
	// 		}
	// 		return response.data;
	// 	},
	// 	function(err) {
	// 		console.error("error trashing note", err)
	// 	})
	// }

	NotesFactory.trashNote = function(noteId) {
		// console.log("inside NotesFactory.trashNote",noteId)
		return $http.put('/api/notes/' + noteId + '/trash/add')
		.then(function(response) {
			var trashNote = response.data;
			var notebookID = NotesFactory.findParentNotebook(trashNote._id) 
            NotesFactory.updateNoteInNotebookCache(notebookID, trashNote, 'update');
			return response.data;
		},
		function(err) {
			console.error("error trashing note", err)
		})
	}

	NotesFactory.addTag = function(noteId, tag) {
        NotesFactory.updateTagsCache(tag, 'add');
		return $http.post('/api/notes/' +  noteId + '/tags', {tag: tag})
	}

	NotesFactory.removeTag = function(noteId, tag) {
        NotesFactory.updateTagsCache(tag, 'delete');
		return $http.put('/api/notes/' +  noteId + '/tags', {tag: tag});
	}

	NotesFactory.findParentNotebook = function(noteId) {
		for (var i = 0; i < notebookCache.length; i++) {
			for (var j = 0; j < notebookCache[i].notes.length; j++) {
				if(notebookCache[i].notes[j]._id == noteId) {
					return notebookCache[i]._id;
				}
			}
		}
	}

	NotesFactory.isSideNavOpen = function() {
		return sideNavOpen;
	}

	NotesFactory.toggleSideNav = function() {
		console.log("toggleSideNav running. sideNavOpen is now",sideNavOpen)
		sideNavOpen = !sideNavOpen;
	}

	return NotesFactory; 
})