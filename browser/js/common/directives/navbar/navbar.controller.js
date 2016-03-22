app.controller('NavbarCtrl', function($scope, NotesFactory,notesService,AuthService,$rootScope) {

    // this piece is not working.
    // how to get current notes that are in a parent scope?
     $scope.getnotes = function(){
        $scope.notes = notesService.getallnotes();
        //console.log("this is notes,", $scope.notes);
     }
     $scope.newNote = function(notebookId) {
        return AuthService.getLoggedInUser()
        .then(function(user) {
          return NotesFactory.newNote(user._id, notebookId);
        }, function(err) {
            console.error("Error retrieving user!", err)
        })
        .then(function(newNote) {
            console.log('here is the new note?', newNote)
          $rootScope.currentNote = newNote;
        })
    }

    $scope.getNotebooks = function() {
        return AuthService.getLoggedInUser()
        .then(function(user) {
          return NotesFactory.fetchMyNotebooks(user._id)
          .then(function(notebooks) {
            $scope.notebooks = notebooks;
            console.log($scope.notebooks);
          });
        }, function(err) {
            console.error("Error retrieving user!", err)
        })
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