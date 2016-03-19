app.controller('NavbarCtrl', function($scope, NotesFactory) {
	$scope.notes = NotesFactory.notes;
})