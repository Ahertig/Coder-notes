app.controller('SidenavCtrl', function($scope, NotesFactory) {
	$scope.notes = NotesFactory.notes;
	$scope.notebooks = NotesFactory.notebooks;
	$scope.tags = NotesFactory.tags;
})