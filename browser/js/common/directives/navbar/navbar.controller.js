app.controller('NavbarCtrl', function($scope, NotesFactory,AuthService,$rootScope) {


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
        return NotesFactory.newNotebook(notebookTitle)
        .then(function(newNotebook) {
            NotesFactory.setCurrentNotebook(newNotebook);
            console.log('here is the new notebook?', newNotebook)
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
 });
app.filter('trunc', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || '...');
    };
});


