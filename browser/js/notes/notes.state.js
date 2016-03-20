app.config(function ($stateProvider) {

	$stateProvider.state('usercontent', {
		url: '/notes',
		templateUrl: 'js/notes/notes.html',
		controller: 'NotesCtrl',
		resolve: {
			myNotebooks: function(NotesFactory,AuthService) {
				var iAm;
				return AuthService.getLoggedInUser()
				.then(function(user) {
					iAm = user;
				}, function(err) {
					console.error("Error retrieving user!", err)
				})
				.then(function() {
					// console.log("usercontent state. fetching notes for",iAm._id)
					return NotesFactory.fetchMyNotebooks(iAm._id)
				})
			}
			// ,
			// // this route can probably be trimmed. revisit  function after route is edited
			// notesInOneNotebook: function(NotesFactory, AuthService) {
			// 	var iAm, theNotebookId;
			// 	return AuthService.getLoggedInUser()
			// 	.then(function(user,notebookId) {
			// 		iAm = user;
			// 		theNotebookId = notebookId
			// 	}, function(err) {
			// 		console.error("Error retrieving notes in notebook!", err)
			// 	})
			// 	.then(function() {
			// 		console.log("retrieving all notes in notebook")
			// 		return NotesFactory.getNotesInOneNotebook(iAm._id, theNotebookId)
			// 	})
			// }
		}
	});
    
});