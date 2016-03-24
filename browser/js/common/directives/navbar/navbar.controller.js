app.controller('NavbarCtrl', function($scope, NotesFactory,notesService,AuthService,$rootScope) {

     $scope.getcurrentNote = function(note){
        $rootScope.currentNote = note;
     }
     $scope.getnotes = function(){
        $scope.notes = notesService.getallnotes();
        //console.log("this is notes,", $scope.notes);
     }
     $scope.newNote = function(notebookId) {
        // NotesFactory.getCachedNotebooks();
        return AuthService.getLoggedInUser()
        .then(function(user) {
          return NotesFactory.newNote(user._id, notebookId);
        }, function(err) {
            console.error("Error retrieving user!", err)
        })
        .then(function(newNotebook) {
            // console.log('here is the new note?', newNotebook)
            $rootScope.currentNote = newNotebook;
        })
    }

    $scope.newNotebook = function() {
        return AuthService.getLoggedInUser()
        .then(function(user) {
          return NotesFactory.newNotebook();
        }, function(err) {
            console.error("Error retrieving user!", err)
        })
        .then(function(newNotebook) {
            console.log('here is the new notebook?', newNotebook)
            // $rootScope.currentNote = newNotebook;
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