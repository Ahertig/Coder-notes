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
		return $http.get('/api/users/'+ userId + '/notebooks/own')
		.then(function(response) {
			angular.copy(response.data, notebookCache);
			console.log("notebook cache is now", notebookCache)
			//console.log("got notebook data", response.data)
			return notebookCache;
		}, function(err) {
			console.error("could not fetch notebooks for user",userId)
		})
	}

	NotesFactory.fetchMySharedNotebooks = function(userId) {
		// console.log("notesfactory. fetching share notebooks for", userId)
		return $http.get('/api/users/' + userId + '/notebooks/shared')
		.then(function(response) {
			angular.copy(response.data, sharedNotebookCache);
			console.log("shared notebook cache is now", sharedNotebookCache)
			// console.log("fetched shared notebooks", response.data)
			return sharedNotebookCache;
		}, function(err) {
			console.error("notesfactory. could not fetch shared notebooks for user", userId)
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
		return $http.get('/api/users/'+ userId + '/usernotes')
		.then(function(response) {
			angular.copy(response.data, notesCache);
			console.log("notes cache is now", notesCache);
			// return replaceCode(response.data);
			return notesCache;
		})

	}

	// this function is working!
	NotesFactory.fetchMyTags = function(userId) {
		return $http.get('/api/users/'+ userId + '/tags')
		.then(function(response) {
			// console.log("got tag data", response.data)
			angular.copy(response.data, tagsCache);
			console.log("tagsCache", tagsCache)
			return tagsCache;
		}, function(err) {
			console.error("could not fetch tags for user",userId)
		})	
	}

	// can we store current note on NotesFactory.currentNote?
	NotesFactory.getNote = function (noteId) {
		return $http.get('/api/note/' + noteId)
		.then(function(response) {
			return response.data;
		},
		function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.saveNote = function (userID,notebookId,noteId,noteUpdate) {
		console.log("inside NotesFactory.saveNote. noteID:",noteId,"notebookId:", notebookId)
		return $http.put('/api/users/' + userID + '/notebooks/' + notebookId + '/notes/' + noteId, noteUpdate)
		.then(function(response) {
			return response.data;
		},
		function(err) {
			console.error("could not find note", err)
		})
	}

	NotesFactory.newNote = function (userId, notebookId) {
		return $http.post('/api/users/' + userId + '/notebooks/' + notebookId + '/notes/')
		.then(function(response) {
			for (var i = 0; i < notebookCache.length; i++) {
				if(notebookCache[i]._id == notebookId) {
					notebookCache[i].notes.push(response.data);
					console.log("** adding new note to notebook cache", response.data)
					console.log("***** notebookCache is now",notebookCache);
				}
			}

			notesCache.push(response.data);
			console.log("adding new note to notesCache", response.data)

			return response.data;
		}, 
		function(err) {
			console.error("could not create note", err)
		})	
	}

	NotesFactory.addTag = function(noteId, tag) {
        // var tagToAdd = tagsCache.push(tag)
        $rootScope.currentNote.tags.push(tag);
		return $http.post('/api/note/' +  noteId + '/tags', {tag: tag})
	}

	NotesFactory.removeTag = function(noteId, tag) {
		var index = $rootScope.currentNote.tags.indexOf(tag);
		console.log(index, $rootScope.currentNote.tags)
        $rootScope.currentNote.tags.splice(index, 1)
        console.log(index, $rootScope.currentNote.tags)
		return $http.put('/api/note/' +  noteId + '/tags', {tag: tag})
	}

	return NotesFactory; 
})