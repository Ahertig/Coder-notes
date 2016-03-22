app.config(function ($stateProvider) {
	var iAm;

	// this is the main state to show user content.
	$stateProvider.state('usercontent', {
		url: '/notes',
		templateUrl: 'js/notes/notes.html',
		controller: 'NotesCtrl',
		resolve: {
			/*
				AW: 
					if you want to retrieve the currentUser and make that object available 
					to all of the other resolve blocks, you can simply use a resolve block 
					to retrieve the user and then inject that user as a dependency to all other 
					blocks

			

			currentUser: function(AuthService){
				return AuthService.getLoggedInUser()
			},
			*/
			/// AW: inject currentUser down here 
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
			// AW: inject currentUser down here 
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
			// AW: inject currentUser
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
			// AW: inject currentUser
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