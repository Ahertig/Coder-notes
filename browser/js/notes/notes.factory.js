app.factory('NotesFactory', function($http, $q, NotebookFactory) {

	var notesCache = [],
		tagsCache = [], 
		currentNote,
		sideNavOpen = true;
	
	var notesAPI = {

		getCurrentNote: function() {
			if (currentNote) return $q.when(currentNote);
			else {
				return NotebookFactory.getCurrentNotebook()
				.then(function(currentNotebook){
					if (currentNotebook.notes.length > 0){
						currentNote = currentNotebook.notes[0]
				    }
				    else {
				    	notesAPI.newNote(currentNotebook._id)
				    	.then(function(newnote){
				    		currentNote = currentNotebook.notes[0]
				    	})
				    }
					return currentNote;
				})
			}
		},
		setCurrentNote: function(_currentNote) {
			currentNote = _currentNote;
			// console.log("this is factory currentNote ", currentNote);
		},
	    
	    getAllCacheNotes: function(){
	    	return notesCache;
	    },

	    getTagsCache: function() {
			return tagsCache;
		},

		updateTagsCache: function(tag, action) {	
	 		var index = notesAPI.getIndex(tag);
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
		},

		getIndex: function(tag) {
				for (var i = 0; i < tagsCache.length; i++) {
					if(tagsCache[i].tag === tag) {
						return i;
					}
				}
				return -1;
		},
	    
	    updateNoteInNotebookCache: function(notebookID, note, action){
	    	var notebook = NotebookFactory.findNotebookById(notebookID); 	
	 		if(action === 'add'){ 
	         	notebook.notes.unshift(note); 
	         	notesCache.unshift(note);

	 		}
	 		else if(action === 'update'){
	 			var index = notesAPI.findNoteIndex(notebook,note._id);
	 			angular.copy(note, notebook.notes[index]);
	 			notebook.date = note.lastUpdate;
	 			var note_index  = notesAPI.findNoteInNoteCache(note._id);
	 			angular.copy(note, notesCache[note_index]);
	 			//notesCache[notesCache.indexOf(note)] = note;
	 		}
	 		else if(action === 'delete'){ 		
		 			var index = notesAPI.findNoteIndex(notebook,note._id);
		 			var note_index  = notesAPI.findNoteInNoteCache(note._id);
		 			notebook.notes.splice(index,1)
	  				notesCache.splice(note_index,1)
	 		}
		},

	    
	     findNoteIndex: function(notebook, noteId) {
			for (var i = 0; i < notebook.notes.length; i++) {
				if(noteId == notebook.notes[i]._id) {
					return i;
				}
			}
		},
		findNoteInNoteCache: function(noteId) {
			for (var i = 0; i < notesCache.length; i++) {
				if(noteId == notesCache[i]._id) {
					return i;
				}
			}
		},

		fetchMyNotes: function() {
			return NotebookFactory.fetchMyNotebooks()
			.then(function(notebookCache){
			for (var i = 0; i < notebookCache.length; i++) {
				notesCache = notesCache.concat(notebookCache[i].notes);
			}
				return notesCache;
			})
		},

		fetchPublicNotes: function() {
			return $http.get('/api/public/notes')
			.then(function(response) {
				return response.data;
			})
		},

		// this function is working!
		fetchMyTags: function() {
			return $http.get('/api/tags')
			.then(function(response) {
				angular.copy(response.data, tagsCache);
				// console.log('tagsCache',tagsCache);
				return tagsCache;
			})	
		},

		// can we store current note on notesAPI.currentNote?
		getNote: function (noteId) {
			return $http.get('/api/notes/' + noteId)
			.then(function(response) {
				return response.data;
			})
		},

		saveNote: function (notebookId, noteId,noteUpdate) {
			return $http.put('/api/notes/' + noteId, noteUpdate)
			.then(function(response) {
				notesAPI.updateNoteInNotebookCache(notebookId,response.data,'update');
				return response.data;
			})
		},

		newNote: function (notebookId) {
			return $http.post('/api/notebooks/' + notebookId + '/notes')
			.then(function(response) {
				console.log("* notesAPI - I just created a new note", response.data)
	            notesAPI.updateNoteInNotebookCache(notebookId, response.data, 'add');
				return response.data;
			})	
		},

		trashNote: function(noteId) {

			return $http.put('/api/notes/' + noteId + '/trash/add')
			.then(function(response) {
				var trashNote = response.data;
				var notebookID = NotebookFactory.findParentNotebook(trashNote._id) 
	            notesAPI.updateNoteInNotebookCache(notebookID, trashNote, 'update');
				return response.data;
			})
		},

		deleteNote: function(note){
			return $http.delete('/api/trash/' + note._id)
			.then(function(response){
				var trashNote = response.data;
				var notebookID = NotebookFactory.findParentNotebook(note._id) 
				notesAPI.updateNoteInNotebookCache(notebookID,trashNote,'delete');
				notesAPI.setCurrentNote(null);
				return response.data;
			})

		},

		restoreNote: function(noteId) {
			return $http.put('/api/notes/' + noteId + '/trash/remove')
			.then(function(response) {
				var trashNote = response.data;
				var notebookID = NotebookFactory.findParentNotebook(trashNote._id) 
	            notesAPI.updateNoteInNotebookCache(notebookID, trashNote, 'update');
				return response.data;
			})
		},

		addTag: function(noteId, tag) {
	        notesAPI.updateTagsCache(tag, 'add');
			//return $http.post('/api/notes/' +  noteId + '/tags', {tag: tag})
		},

		removeTag: function(noteId, tag) {
	        notesAPI.updateTagsCache(tag, 'delete');
			//return $http.put('/api/notes/' +  noteId + '/tags', {tag: tag});
		},

		isSideNavOpen: function() {
			return sideNavOpen;
		},

		toggleSideNav: function() {
			console.log("toggleSideNav running. sideNavOpen is now",sideNavOpen)
			sideNavOpen = !sideNavOpen;
		}

	}
	return notesAPI; 
})