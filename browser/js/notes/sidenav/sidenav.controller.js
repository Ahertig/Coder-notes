app.controller('SidenavCtrl', function($scope, NotesFactory, $filter) {

	$scope.getCachedNotebooks = NotesFactory.getCachedNotebooks;
	$scope.getTagsCache = NotesFactory.getTagsCache;
	$scope.getnotes = NotesFactory.getAllCacheNotes;
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
    $scope.trashNotebook = function(notebook){
    	NotesFactory.removeNotebook(notebook);
    }
    $scope.deleteNotebook = function(notebook){
    	console.log("deleteNotebook is undefined now!!");
    }
    $scope.restoreNotebook = function(notebook){
    	NotesFactory.restoreNotebook(notebook);
    }
})

app.filter('filterByTag', function(){
	return function (notes, tag) { 
		return notes.filter(
			function(note){
				return (note.tags.indexOf(tag) > -1) && (note.trash == false);
		});
    }
});