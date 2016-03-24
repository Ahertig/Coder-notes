app.controller('SidenavCtrl', function($scope, $rootScope, NotesFactory) {

	$scope.getCachedNotebooks = NotesFactory.getCachedNotebooks;

	// change the current note displayed in singlenote.html to the note that the user clicked in sidenav
	$scope.switchCurrentNote = function(note,notebook) {
        $rootScope.currentNotebook = notebook;
        console.log("current notebook", $rootScope.currentNotebook)
		
		NotesFactory.getNote(note._id)
		.then(function(theNote) {
			console.log("setting current note to", theNote)
			$rootScope.currentNote = theNote;
		})
	
	}

	$scope.filters = {};


})


app.filter('filterByTag', function (tag, notes) { 
        return notes.tags.indexOf(tag) !== -1
    });