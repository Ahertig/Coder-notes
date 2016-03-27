app.controller('NotesCtrl', function($scope, AuthService, myNotebooks, NotesFactory, $rootScope, myTags, mySharedNotebooks, myNotes,notesService, currentNote) {

	$scope.user = null;
    //$scope.notes = myNotes;

    //$scope.tags = myTags;
    $scope.sharednotebooks = mySharedNotebooks;
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

