app.controller('NotesCtrl', function($scope, AuthService, myNotebooks, NotesFactory, $rootScope) {

	$scope.user = null;

    // Tags and notes are hard-coded for now.
    // This will need to be modified!
    $scope.tags = NotesFactory.tags;
    $scope.notes = NotesFactory.notes;

    // set the 'current note' to item 0 in the array by default. 
    // This will be changed later in sidenav.html and the sidenav controller.
    $rootScope.currentNote = $scope.notes[0];

    // This is a promise that retrieves all notebooks for the
    // currently logged-in user.
    $scope.notebooks = myNotebooks;

	$scope.isLoggedIn = function () {
		return AuthService.isAuthenticated();
	};

    var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
            $scope.user = user;
        });
    };

    setUser();

});

