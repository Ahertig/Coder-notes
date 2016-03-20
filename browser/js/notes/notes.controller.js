app.controller('NotesCtrl', function($scope, AuthService, myNotebooks, NotesFactory, $rootScope) {

	$scope.user = null;

    $scope.notes = NotesFactory.notes;

    // set the 'current note' to item 0 in the array by default. This will be changed later in sidenav.html and the sidenav controller.
    $rootScope.currentNote = $scope.notes[0];

    $scope.notebooks = myNotebooks;

    // $scope.notesInThisNotebook = notesInOneNotebook;

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

