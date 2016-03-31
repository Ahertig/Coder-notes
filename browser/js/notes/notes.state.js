app.config(function ($stateProvider) {
	var currentUser;

	// this is the main state to show user content.
	$stateProvider.state('usercontent', {
		url: '/notes',
		templateUrl: 'js/notes/notes.html',
		controller: 'NotesCtrl',
		resolve: {
			currentUser: function(NotesFactory,AuthService) {
				return AuthService.getLoggedInUser()
			},
			myNotebooks: function(NotebookFactory) {
				// console.log("usercontent state. fetching notes for",currentUser._id)
				return NotebookFactory.fetchMyNotebooks()
			},
			mySharedNotebooks: function(NotebookFactory) {
					// console.log("usercontent state. fetching sharednotebooks for",currentUser._id)
				return NotebookFactory.fetchMySharedNotebooks();
			},
			myTags: function(NotesFactory) {
				// console.log("usercontent state. fetching tags for",currentUser._id)
				return NotesFactory.fetchMyTags();
			},
			myNotes: function(NotesFactory, myNotebooks) {
				return NotesFactory.fetchMyNotes();
			},
			currentNote: function(NotesFactory) {
				return NotesFactory.getCurrentNote();
			}
			// ,
			// showSideNavPromise: function(NotesFactory) {
			// 	return NotesFactory.showSideNav;
			// }

    	}
	});
});