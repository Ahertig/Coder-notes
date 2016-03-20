app.controller('SidenavCtrl', function($scope, NotesFactory) {

	// $scope.fetchMyNotes = NotesFactory.fetchMyNotes;

	// $scope.notes = myNotes;

	$scope.notes = NotesFactory.notes;
	// $scope.notebooks = NotesFactory.notebooks;
	// $scope.notebooks = myNotebooks;
	$scope.tags = NotesFactory.tags;
})