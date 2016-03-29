app.controller('SidenavCtrl', function($scope, NotesFactory, $filter, ShareFactory) {

	$scope.getCachedNotebooks = NotesFactory.getCachedNotebooks;
	$scope.getTagsCache = NotesFactory.getTagsCache;
	$scope.getnotes = NotesFactory.getAllCacheNotes;

	console.log($scope.getnotes());
	$scope.setCurrentNotebook = function(notebook){
		NotesFactory.setCurrentNotebook(notebook);
	}

	$scope.setCurrentNote = function(note, notebook){
		NotesFactory.setCurrentNote(note);
		if (notebook){
			NotesFactory.setCurrentNotebook(notebook);
		}
	}
    $scope.toggleSideNav = NotesFactory.toggleSideNav;
    $scope.isSideNavOpen = NotesFactory.isSideNavOpen;

  
  $scope.trashNotebook = function(notebook){
  	NotesFactory.removeNotebook(notebook);
  }
  $scope.deleteNotebook = function(notebook){
  	console.log("deleteNotebook is undefined now!!");
  }
  $scope.restoreNotebook = function(notebook){
  	NotesFactory.restoreNotebook(notebook);
  }

  $scope.setCurrentNote = NotesFactory.setCurrentNote;

  $scope.getNotes = function(){
    $scope.notes = NotesFactory.getAllCacheNotes();
  }

   $scope.newNote = function(notebook) {
      // NotesFactory.getCachedNotebooks();

      NotesFactory.newNote(notebook._id)
      .then(function(newNote){
          NotesFactory.setCurrentNote(newNote);
          NotesFactory.setCurrentNotebook(notebook);
      })
      .then(null, function(err){
        console.error("Error saving new note!", err);
     });
  }
  $scope.newNotebook = function(notebookTitle) {
      console.log('getting here');
      return NotesFactory.newNotebook(notebookTitle)
      .then(function(newNotebook) {
        $scope.newNote(newNotebook)
        // $rootScope.currentNote = newNotebook;
      })
      .then(null, function(err){
          console.log(err);
      })
  }

  $scope.getNotebooks = function() {
     NotesFactory.fetchMyNotebooks()
     .then(function(_notebooks){
          $scope.notebooks = _notebooks;
     })
     .then(null, function(err){
        console.error("Error retrieving notebooks!", err);
     });
  }

  // Manage Notebook Share
    $scope.shareNotebook = function(notebook, email) {
      ShareFactory.shareNotebook(notebook, email)
    }
    
    $scope.removeNotebookShare = function(notebook, email) {
      console.log('in the controller: ', notebook, email)
      ShareFactory.removeNotebookShare(notebook, email)
    }
  
  $scope.filters = {};
  $scope.setTag = function(tag){
    $scope.currentTag = tag.tag;
    $scope.filters[tag.tag] = tag.tag;
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