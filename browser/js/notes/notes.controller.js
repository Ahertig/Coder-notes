app.controller('NotesCtrl', function($scope, AuthService, myNotebooks) {

	$scope.user = null;

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

