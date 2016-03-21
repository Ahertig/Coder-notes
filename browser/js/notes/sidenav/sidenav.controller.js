app.controller('SidenavCtrl', function($scope, $rootScope, NotesFactory) {

	// We may want to create a cache of all notes for this user to avoid repeated DB calls

	// change the current note displayed in singlenote.html to the note that the user clicked in sidenav
	$scope.switchCurrentNote = function(noteId,notebook) {
		// console.log("you clicked note", noteId)
        $rootScope.currentNotebook = notebook;
        console.log("current notebook", $rootScope.currentNotebook)
		
		NotesFactory.getNote(noteId)
		.then(function(theNote) {
			// is there a better way to do this, besides rootScope?
			$rootScope.currentNote = theNote;
			
			 //console.log("rootscope current notebook is now", $rootScope.currentNotebook,$rootScope.currentNote);
		})
	
	}
})