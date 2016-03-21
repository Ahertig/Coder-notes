app.controller('NotesCtrl', function($scope, AuthService, myNotebooks, NotesFactory, $rootScope, myTags, mySharedNotebooks) {

	$scope.user = null;

    // Notes are hard-coded for now.
    // This will need to be modified!
    $scope.notes = NotesFactory.notes;

    // promises
    $scope.tags = myTags;
    $scope.sharednotebooks = mySharedNotebooks;
    $scope.notebooks = myNotebooks;

    // set the 'current note' to item 0 in the array by default. 
    // This will be changed later in sidenav.html and the sidenav controller.
    $rootScope.currentNote = $scope.notes[0];

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

