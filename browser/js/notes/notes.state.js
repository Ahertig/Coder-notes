app.config(function ($stateProvider) {

	// this is the main state to show user content.
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
		}
	});
    
});