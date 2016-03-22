app.factory('NotesFactory', function($http) {

	var NotesFactory = {};

	// This function is working!
	NotesFactory.fetchMyNotebooks = function(userId) {
		// console.log("in notesfactory fetchMyNotebooks. fetching data for user",userId)
		return $http.get('/api/users/'+ userId + '/notebooks/own')
		.then(function(response) {
			//console.log("got notebook data", response.data)
			return response.data;
		}, function(err) {
			console.error("could not fetch notebooks for user",userId)
		})
	}

	NotesFactory.fetchMySharedNotebooks = function(userId) {
		// console.log("notesfactory. fetching share notebooks for", userId)
		return $http.get('/api/users/' + userId + '/notebooks/shared')
		.then(function(response) {
			// console.log("fetched shared notebooks", response.data)
			return response.data;
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

	// how to save/retrieve HTML elements?
	NotesFactory.fetchMyNotes = function(userId) {
		return $http.get('/api/users/'+ userId + '/usernotes')
		.then(function(response) {
			// return replaceCode(response.data);
			return response.data;
		})

	}

	// this function is working!
	NotesFactory.fetchMyTags = function(userId) {
		return $http.get('/api/users/'+ userId + '/tags')
		.then(function(response) {
			// console.log("got tag data", response.data)
			return response.data;
		}, function(err) {
			console.error("could not fetch tags for user",userId)
		})	
	}

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
		return $http.put('/api/users/' + userID + '/notebooks/' + notebookId + '/notes/' + noteId, noteUpdate)
		.then(function(response) {
			return response.data;
		},
		function(err) {
			console.error("could not find note", err)
		})
	}

	// Testing a newNote function
	NotesFactory.newNote = function (userId, notebookId) {
		return $http.post('/api/users/' + userId + '/notebooks/' + notebookId + '/notes/')
		.then(function(response) {
			return response.data;
		}, 
		function(err) {
			console.error("could not create note", err)
		})	
	}

	// I want to populate the note titles that are displayed below notebooks
	// in the sidenav. How to do that?
	
	// NotesFactory.getNotesInOneNotebook = function(userId, notebookId) {
	// 	return $http.get('/api/' + userId + '/notebooks/' + notebookId + '/notes')
	// 	.then(function(response) {
	// 		console.log("got note data", response.data)
	// 		return response.data;
	// 	}, function(err) {
	// 		console.error("could not fetch note for user", userId, "notebook", notebookId)
	// 	})
	// }

	return NotesFactory; 
})