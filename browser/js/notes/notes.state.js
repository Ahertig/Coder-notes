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
			myNotebooks: function(NotesFactory, currentUser) {
				// console.log("usercontent state. fetching notes for",currentUser._id)
				return NotesFactory.fetchMyNotebooks(currentUser._id)
			},
			mySharedNotebooks: function(NotesFactory,currentUser) {
					// console.log("usercontent state. fetching sharednotebooks for",currentUser._id)
				return NotesFactory.fetchMySharedNotebooks(currentUser._id);
			},
			myTags: function(NotesFactory) {
				// console.log("usercontent state. fetching tags for",currentUser._id)
				return NotesFactory.fetchMyTags();
			},
			myNotes: function(NotesFactory, currentUser) {
				return NotesFactory.fetchMyNotes(currentUser._id);
			}
    	}
	});
});