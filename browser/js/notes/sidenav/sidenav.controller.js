app.controller('SidenavCtrl', function($scope, $rootScope, NotesFactory) {


	$scope.getCachedNotebooks = NotesFactory.getCachedNotebooks;

	// change the current note displayed in singlenote.html to the note that the user clicked in sidenav
	$scope.switchCurrentNote = function(note,notebook) {
		// console.log("you clicked note", noteId)
        $rootScope.currentNotebook = notebook;
        //console.log("current notebook", $rootScope.currentNotebook)
		
		NotesFactory.getNote(note._id)
		.then(function(theNote) {
			// is there a better way to do this, besides rootScope?
			$rootScope.currentNote = theNote;
			
			 //console.log("rootscope current notebook is now", $rootScope.currentNotebook,$rootScope.currentNote);
		})
	
	}
})