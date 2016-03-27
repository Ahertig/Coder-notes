app.controller('SidenavCtrl', function($scope, NotesFactory, $filter) {

	$scope.getCachedNotebooks = NotesFactory.getCachedNotebooks;
	$scope.getTagsCache = NotesFactory.getTagsCache;
	$scope.notes = NotesFactory.getAllCacheNotes();
	$scope.setCurrentNotebook = function(notebook){
		NotesFactory.setCurrentNotebook(notebook);
	}

	$scope.setCurrentNote = function(note, notebook){
		NotesFactory.setCurrentNote(note);
		if (notebook){
			NotesFactory.setCurrentNotebook(notebook);
		}
	}
    $scope.setTag = function(tag){
    	$scope.currentTag = tag.tag;
    }
})

app.filter('filterByTag', function(){
	return function (notes, tag) { 
		return notes.filter(
			function(note){
				return note.tags.indexOf(tag) > -1;
		});
    }
});