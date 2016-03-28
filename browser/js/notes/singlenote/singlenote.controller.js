app.controller('SingleNoteCtrl', function($scope, NotesFactory, TonicFactory, GithubFactory, AuthService) {
    $scope.savenote = {};
    $scope.tagform = {};

    $scope.showTagEditWindow = false

    var stroutput = "";
  
    $scope.currentNote = NotesFactory.getCurrentNote;
    
    $scope.getCurrentNootbook = function(){
      NotesFactory.getCurrentNotebook()
      .then(function(_currentNotebook){
       return _currentNotebook;
      })
   }
    //$scope.currentNotebook = NotesFactory.getCurrentNotebook;
    $scope.showmarkdown = false;
    $scope.successmessage = null;
   
    $scope.removeTag = function(note, tag) {
      console.log("remove tag");
      if(note.tags.indexOf(tag) === -1){
        console.log("this note doesn't have this tag!");
      }
      else {
        NotesFactory.removeTag(note._id, tag)
        .then(function(newNote){
          var currentNotebookID = NotesFactory.findParentNotebook(note._id);
          NotesFactory.updateNoteInNotebookCache(currentNotebookID, newNote.data, 'update');
          $scope.tagsremoved.push(tag);
        });
      }
    }

    $scope.addTag = function(note, tag) {
      if(!tag) { 
        $scope.tagsavefailure = "Cannot save an empty tag!"; 
        return;
      }
      if(note.tags.indexOf(tag) === -1){
        NotesFactory.addTag(note._id, tag)
        .then(function(newNote) {       
           var currentNotebookID = NotesFactory.findParentNotebook(note._id);
          NotesFactory.updateNoteInNotebookCache(currentNotebookID, newNote.data, 'update');
          $scope.tagsavesuccess = "Tag saved successfully!";
          $scope.tagToAdd = "";
        })
        .then(null, function(err) {
         console.error("error saving tag",err)
        })
      }
      else {
        $scope.tagsavefailure = "this tag is in tags! add a new tag?";
      }
    } 

    $scope.openTagWindow = function() {
      $scope.showTagEditWindow = !$scope.showTagEditWindow;
    }

    $scope.save = function(){ 
      var currentNotebook;
      var lastUpdateDate = Date.now();
      var subjectToSave = $('#notesubject').val();
      var bodyToSave = $('#notebody').val();
      $scope.savenote = {
        "subject": subjectToSave,
        "body": bodyToSave,
        "lastUpdate": lastUpdateDate
      }  
      if(!$scope.getCurrentNootbook())  {
        currentNotebook = NotesFactory.findParentNotebook($scope.currentNote()._id);
      }
      else {
        currentNotebook = $scope.getCurrentNootbook();
      }
      NotesFactory.saveNote(currentNotebook,$scope.currentNote()._id, $scope.savenote)
      .then(function(note) {
          $scope.successmessage="Note saved successfully!";
        }, function(err) {
          $scope.errormessage = "Error saving note" + err;
        })    
    }

    $scope.trashNote = function(noteId) {
      NotesFactory.trashNote(noteId)
      .then(function(){
        $('#edit-tab').removeClass('active');
        $('#preview-tab').addClass('active');
      })
      
    }

    $scope.deleteNote = function(note) {
      NotesFactory.deleteNote(note)
        .then(function (data) {
          console.log("this note has been deleted", data);
        });
    }
    $scope.restoreNote = function(noteId){
      NotesFactory.restoreNote(noteId);
    }

    $scope.highlightPre = function() {
      hljs.initHighlighting();
    }

    $scope.addPre = function() {
      var domElement = $('#testdiv')[0];
      var codeValue = domElement.innerHTML;
      var preElement = $('<pre><code>' + codeValue + '</code></pre>');
      $(domElement).replaceWith(preElement);
      hljs.initHighlighting();
    }

    // Tonic Setup
    $scope.tonic = true;
    $scope.closeTonic = function() {
      document.getElementById("my-element").innerHTML = "";
      $scope.tonic = true;
    }

    $scope.runTonic = function() {
      $scope.tonic = true;
      document.getElementById("my-element").innerHTML = "";
      var notebook = Tonic.createNotebook({
        element: document.getElementById("my-element"),
        source: TonicFactory.getSelectionText()
      })       
      $scope.tonic = false;
    }

    // Creating Gists 
    $scope.createGist = function(note) {
      AuthService.getLoggedInUser()
      .then( function(user) {
        var headers = { "Authorization": "token " + user.github.token };
        var newGist = {
          "description": note.subject,
          "public": false,
          "files": {
            "file1.txt": {
              "content": note.body
            }
          }
        }
        GithubFactory.createGist(newGist, headers)
        .then(function(gist) {
          $scope.successmessage="Gist created successfully!";
        })
      })
    }



})

// Tonic Keypress Directive
app.directive('enterKey', function(TonicFactory) {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;
            if (keyCode === 13 && event.ctrlKey) {    
                scope.$apply(function() {
                    scope.$eval(attrs.enterKey);
                });
                event.preventDefault();
            }
        });
    };
})

