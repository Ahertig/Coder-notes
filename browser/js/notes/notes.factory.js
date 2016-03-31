app.factory('NotesFactory', function($http, $q, NotebookFactory) {

	var NotesFactory = {},
		notesCache = [],
		// notebookCache = [],
		sharedNotebookCache = [],
		tagsCache = [], 
		currentNote,
		// currentNotebook,
		sideNavOpen = true;
	
	NotesFactory.getCurrentNote = function() {
		if (currentNote) return $q.when(currentNote);
		else {
			return NotebookFactory.getCurrentNotebook()
			.then(function(currentNotebook){
				if (currentNotebook.notes.length > 0){
					currentNote = currentNotebook.notes[0]
			    }
			    else {
			    	NotesFactory.newNote(currentNotebook._id)
			    	.then(function(newnote){
			    		currentNote = currentNotebook.notes[0]
			    	})
			    }
				return currentNote;
			})
		}
	}
	NotesFactory.setCurrentNote = function(_currentNote) {
		currentNote = _currentNote;
		// console.log("this is factory currentNote ", currentNote);
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
    
    NotesFactory.updateNoteInNotebookCache = function(notebookID, note, action){
    	var notebook = NotebookFactory.findNotebookById(notebookID); 	
 		if(action === 'add'){ 
         	notebook.notes.unshift(note); 
         	notesCache.unshift(note);

 		}
 		else if(action === 'update'){
 			var index = NotesFactory.findNoteIndex(notebook,note._id);
 			angular.copy(note, notebook.notes[index]);
 			notebook.date = note.lastUpdate;
 			var note_index  = NotesFactory.findNoteInNoteCache(note._id);
 			angular.copy(note, notesCache[note_index]);
 			//notesCache[notesCache.indexOf(note)] = note;
 		}
 		else if(action === 'delete'){ 		
	 			var index = NotesFactory.findNoteIndex(notebook,note._id);
	 			var note_index  = NotesFactory.findNoteInNoteCache(note._id);
	 			notebook.notes.splice(index,1)
  				notesCache.splice(note_index,1)
 		}
	}

    
     NotesFactory.findNoteIndex = function(notebook, noteId) {
		for (var i = 0; i < notebook.notes.length; i++) {
			if(noteId == notebook.notes[i]._id) {
				return i;
			}
		}
	}
	NotesFactory.findNoteInNoteCache = function(noteId) {
		for (var i = 0; i < notesCache.length; i++) {
			if(noteId == notesCache[i]._id) {
				return i;
			}
		}
	}

	NotesFactory.fetchMyNotes = function() {
		return NotebookFactory.fetchMyNotebooks()
		.then(function(notebookCache){
		for (var i = 0; i < notebookCache.length; i++) {
			notesCache = notesCache.concat(notebookCache[i].notes);
		}
			return notesCache;
		})
	}

	NotesFactory.fetchPublicNotes = function() {
		return $http.get('/api/public/notes')
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
			return response.data;
		}, function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.saveNote = function (notebookId, noteId,noteUpdate) {
		return $http.put('/api/notes/' + noteId, noteUpdate)
		.then(function(response) {
			NotesFactory.updateNoteInNotebookCache(notebookId,response.data,'update');
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

	NotesFactory.trashNote = function(noteId) {

		return $http.put('/api/notes/' + noteId + '/trash/add')
		.then(function(response) {
			var trashNote = response.data;
			var notebookID = NotebookFactory.findParentNotebook(trashNote._id) 
            NotesFactory.updateNoteInNotebookCache(notebookID, trashNote, 'update');
			return response.data;
		},
		function(err) {
			console.error("error trashing note", err)
		})
	}

	NotesFactory.deleteNote = function(note){
		return $http.delete('/api/trash/' + note._id)
		.then(function(response){
			var trashNote = response.data;
			var notebookID = NotebookFactory.findParentNotebook(note._id) 
			NotesFactory.updateNoteInNotebookCache(notebookID,trashNote,'delete');
			NotesFactory.setCurrentNote(null);
			return response.data;
		}, function(err) {
			console.error("error trashing note", err)
		})

	}

	NotesFactory.restoreNote = function(noteId) {
		return $http.put('/api/notes/' + noteId + '/trash/remove')
		.then(function(response) {
			var trashNote = response.data;
			var notebookID = NotebookFactory.findParentNotebook(trashNote._id) 
            NotesFactory.updateNoteInNotebookCache(notebookID, trashNote, 'update');
			return response.data;
		},
		function(err) {
			console.error("error trashing note", err)
		})
	}

	NotesFactory.addTag = function(noteId, tag) {
        NotesFactory.updateTagsCache(tag, 'add');
		//return $http.post('/api/notes/' +  noteId + '/tags', {tag: tag})
	}

	NotesFactory.removeTag = function(noteId, tag) {
        NotesFactory.updateTagsCache(tag, 'delete');
		//return $http.put('/api/notes/' +  noteId + '/tags', {tag: tag});
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