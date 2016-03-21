app.config(function ($stateProvider) {
	var iAm;

	// this is the main state to show user content.
	$stateProvider.state('usercontent', {
		url: '/notes',
		templateUrl: 'js/notes/notes.html',
		controller: 'NotesCtrl',
		resolve: {
			myNotebooks: function(NotesFactory,AuthService) {
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
			},
			mySharedNotebooks: function(NotesFactory,AuthService) {
				return AuthService.getLoggedInUser()
				.then(function(user) {
					iAm = user;
				}, function(err) {
					console.error("Error retrieving user!", err)
				})
				.then(function() {
					// console.log("usercontent state. fetching sharednotebooks for",iAm._id)
					return NotesFactory.fetchMySharedNotebooks(iAm._id);
				})
			},
			myTags: function(NotesFactory,AuthService) {
				return AuthService.getLoggedInUser()
				.then(function(user) {
					iAm = user;
				}, function(err) {
					console.error("Error retrieving user!", err)
				})
				.then(function() {
					// console.log("usercontent state. fetching tags for",iAm._id)
					return NotesFactory.fetchMyTags(iAm._id);
				})
			},
			myNotes: function(NotesFactory, AuthService) {
				return AuthService.getLoggedInUser()
				.then(function(user) {
					iAm = user;
				})
				.then(function() {
					return NotesFactory.fetchMyNotes(iAm._id);
				})
			}
		}
	});
    
});