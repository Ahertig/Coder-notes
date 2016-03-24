app.factory('NotesFactory', function($http, $rootScope) {

	var NotesFactory = {},
		notesCache = [],
		notebookCache = [],
		sharedNotebookCache = [],
		tagsCache = [];


	NotesFactory.getCachedNotebooks = function() {
		return notebookCache;
	}


	// This function is working!
	NotesFactory.fetchMyNotebooks = function(userId) {
		// console.log("in notesfactory fetchMyNotebooks. fetching data for user",userId)
		return $http.get('/api/notebooks')
		.then(function(response) {
			angular.copy(response.data, notebookCache);
			// console.log("notebook cache is now", notebookCache)
			//console.log("got notebook data", response.data)
			return notebookCache;
		}, function(err) {
			// console.error("could not fetch notebooks for user",userId)
		})
	}

	NotesFactory.fetchMySharedNotebooks = function(userId) {
		// console.log("notesfactory. fetching share notebooks for", userId)
		return $http.get('/api/notebooks/shared')
		.then(function(response) {
			angular.copy(response.data, sharedNotebookCache);
			// console.log("shared notebook cache is now", sharedNotebookCache)
			// console.log("fetched shared notebooks", response.data)
			return sharedNotebookCache;
		}, function(err) {
			// console.error("notesfactory. could not fetch shared notebooks for user", userId)
		})
	}

	// this is not working
	function replaceCode(input) {
		var temp = input.toString()
		temp = temp.replace("&lt;","<");
		temp = temp.replace("&gt;",">");
		return temp;
	}

	NotesFactory.fetchMyNotes = function(userId) {
		return $http.get('/api/notes')
		.then(function(response) {
			angular.copy(response.data, notesCache);
			// return replaceCode(response.data);
			return notesCache;
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
			return response.data;
		}, function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.saveNote = function (noteId,noteUpdate) {
		return $http.put('/api/notes/' + noteId, noteUpdate)
		.then(function(response) {
			return response.data;
		},
		function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.newNote = function (userId, notebookId) {
		return $http.post('/api/notebooks/' + notebookId + '/notes')
		.then(function(response) {
			console.log('notebook id ', notebookId)
			console.log('response from server', response.data._id )
			for (var i = 0; i < notebookCache.length; i++) {
				if(notebookCache[i]._id == notebookId) {
					notebookCache[i].notes.push(response.data);
				}
			}

			notesCache.push(response.data);

			return response.data;
		}, 
		function(err) {
			console.error("could not create note", err)
		})	
	}

	NotesFactory.newNotebook = function() {
		return $http.post('/api/notebooks/')
		.then(function(response) {
			return response.data;
		},
		function(err) {
			console.error("could not create notebook", err)
		})
	}

	NotesFactory.trashNote = function(noteId) {
		return $http.put('/api/notes/' + noteId + '/trash/add')
		.then(function(response) {
			return response.data;
		})
	}

	NotesFactory.addTag = function(noteId, tag) {
        $rootScope.currentNote.tags.push(tag);
		return $http.post('/api/notes/' +  noteId + '/tags', {tag: tag})
	}

	NotesFactory.removeTag = function(noteId, tag) {
		var index = $rootScope.currentNote.tags.indexOf(tag);
        $rootScope.currentNote.tags.splice(index, 1)
		return $http.put('/api/notes/' +  noteId + '/tags', {tag: tag})
	}

	return NotesFactory; 
})