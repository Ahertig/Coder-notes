app.config(function ($stateProvider) {
    // $stateProvider.state('notes', {
    //     url: '/notes',
    //     templateUrl: 'js/notes/notes.html',
    //     controller: 'NotesCtrl'
    // });


    // $stateProvider.state('notesByUser', {
    //     url: '/notes/:userId',
    //     templateUrl: 'js/notes/notes.html',
    //     controller: 'NotesCtrl',
    //     params: {
    //     	userId: null
    //     },
    //     resolve: {
    //     	myNotes: function(NotesFactory) {
    //     		return NotesFactory.fetchMyNotes(userId)
    //     	}
    //     }
    // });

	// $stateProvider.state('contentByUser', {
	// 	url: '/:userId',
	// 	templateUrl: 'js/notes/notes.html',
	// 	controller: 'NotesCtrl',
	// 	scope: {
	// 		"foo" : "bar"
	// 	},
	// 	params: {
	// 		userId: null
	// 	},
	// 	resolve: {
	// 		// myNotes: function(NotesFactory) {
	// 		// 	return NotesFactory.fetchMyNotes(userId)
	// 		// },
	// 		myNotebooks: function(NotesFactory,$stateParams) {
	// 			console.log("notes state. fetching notes for",$stateParams.userId)
	// 			return NotesFactory.fetchMyNotebooks($stateParams.userId)
	// 		}
	// 	}
	// });

	$stateProvider.state('usercontent', {
		url: '/content',
		templateUrl: 'js/notes/notes.html',
		controller: 'NotesCtrl',
		resolve: {
			// myNotes: function(NotesFactory) {
			// 	return NotesFactory.fetchMyNotes(userId)
			// },
			myNotebooks: function(NotesFactory,AuthService) {
				var iAm;
				return AuthService.getLoggedInUser()
				.then(function(user) {
					iAm = user;
				}, function(err) {
					console.error("error retrieving user", err)
				})
				.then(function() {
					console.log("usercontent state. fetching notes for",iAm._id)
					return NotesFactory.fetchMyNotebooks(iAm._id)
				})
			}
		}
	});
    
});