app.factory('NotesFactory', function($http, $rootScope, $q) {

	var NotesFactory = {},
		notesCache = [],
		notebookCache = [],
		sharedNotebookCache = [],
		tagsCache = [], 
		currentNote,
		currentNotebook;
	
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

			// angular.copy(NotesFactory.getCurrentNotebook().notes[0], currentNote)
			// return currentNote;

			// return NotesFactory.fetchMyNotes()
			// .then(function(notes) {
			// 	angular.copy(notes[5],currentNote);
			// 	console.log("set current note initially to", currentNote)
			// 	return currentNote;				
			// })
		}
	}
	NotesFactory.setCurrentNote = function(_currentNote) {
		currentNote = _currentNote;
		console.log("this is factory currentNote ", currentNote);
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
				console.log("set current note initially to", currentNotebook)
				return currentNotebook;	
			})
		}
	}

	NotesFactory.setCurrentNotebook = function(_currentNotebook) {
		currentNotebook = _currentNotebook;
	}

	NotesFactory.currentNotebook = function() {
		NotesFactory.getCurrentNotebook()
		.then(function(notebook) {
			return notebook
		})
	}
    


    NotesFactory.getTagsCache = function() {
		return tagsCache;
	}
	NotesFactory.updateTagsCache = function(tag, action) {
		if(action == 'add'){
			if(tagsCache.indexOf(tag) > -1) {
				tagsCache.unshift(tag);
			}		
		}
		else if(action == 'delete'){
			tagsCache.splice(tagsCache.indexOf(tag),1);
		}
		console.log("tags cache is now", tagsCache)

	}
   

	NotesFactory.getCachedNotebooks = function() {
		return notebookCache;
	}
    
    NotesFactory.updateNoteInNotebookCache = function(notebookID, note, action){
    	var notebook = NotesFactory.findNotebookById(notebookID); 
    	console.log("this is notebookID ", notebookID);
    	console.log("this is note ", note);
    	console.log("this is notebook",  notebook);

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
			console.log("notebookCache,", notebookCache);
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
			return tagsCache;
		}, function(err) {
			console.error("could not fetch tags for user",userId)
		})	
	}

	// can we store current note on NotesFactory.currentNote?
	NotesFactory.getNote = function (noteId) {
		return $http.get('/api/notes/' + noteId)
		.then(function(response) {
			console.log("I just got note", response.data)
			return response.data;
		}, function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.saveNote = function (notebookId, noteId,noteUpdate) {
		console.log("this is notebookId (saveNote), ", notebookId);
		return $http.put('/api/notes/' + noteId, noteUpdate)
		.then(function(response) {
		    console.log()
			NotesFactory.updateNoteInNotebookCache(notebookId,response.data,'update');
			console.log("response data is", response.data)
			return response.data;
		},
		function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.newNote = function (notebookId) {
		return $http.post('/api/notebooks/' + notebookId + '/notes')
		.then(function(response) {
            NotesFactory.updateNoteInNotebookCache(notebookId, response.data, 'add');
			return response.data;
		}, 
		function(err) {
			console.error("could not create note", err)
		})	
	}

	NotesFactory.newNotebook = function(title) {
		return $http.post('/api/notebooks/', {title: title})
		.then(function(response) {
			NotesFactory.updateNotebookCache(response.data,'add');
			return response.data;
		},
		function(err) {
			console.error("could not create notebook", err)
		})
	}

	NotesFactory.trashNote = function(note, method) {
		return $http.put('/api/notes/' + note._id + '/trash/add')
		.then(function (response) {
			return response.data
		})
		.then(function() {
			return NotesFactory.findParentNotebook(note._id)						
		})
		.then(function(notebookId) {
			NotesFactory.updateNoteInNotebookCache(notebookId, note, method)
		})
	}

	NotesFactory.restore = function(noteId) {
		return $http.put('/api/notes/' + noteId + '/trash/restore')
	}

	NotesFactory.addTag = function(noteId, tag) {
        NotesFactory.updateTagsCache(tag, 'add');
		return $http.post('/api/notes/' +  noteId + '/tags', {tag: tag});
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


	return NotesFactory; 
})