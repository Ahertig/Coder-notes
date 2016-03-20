app.controller('SidenavCtrl', function($scope, $rootScope) {

	// Eventually this next function needs to be hooked up to switch the current note to the parameter passed.
	// I suspect we will need to have a cache of all notes for this user.
	$scope.switchCurrentNote = function(noteId) {
		console.log("you clicked note", noteId)
		$rootScope.currentNote = noteId;
		console.log("rootscope current note is now", $rootScope.currentNote);
	}
})