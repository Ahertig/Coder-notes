app.controller('SingleNoteCtrl', function($scope, NotesFactory, TonicFactory) {
    $scope.savenote = {};
    $scope.tagform = {};

    $scope.showTagEditWindow = false

    var stroutput = "";
  
    $scope.currentNote = NotesFactory.getCurrentNote;
    
    $scope.getCurrentNootbook = function(){
    NotesFactory.getCurrentNotebook()
    .then(function(_currentNotebook){
      $scope.curretnNotebook = _currentNotebook;
    })
   }
   $scope.getCurrentNootbook();

    //$scope.currentNotebook = NotesFactory.getCurrentNotebook;
    $scope.showmarkdown = false;
    $scope.successmessage = null;

    $scope.removeTag = function(noteId, tag) {
      NotesFactory.removeTag(noteId, tag);
    }

    $scope.addTag = function(noteId, tag) {
      if(!tag) { 
        $scope.tagsavefailure = "Cannot save an empty tag!"; 
        return;
      }
      console.log("running addTag", noteId, tag)

      NotesFactory.addTag(noteId, tag)
      .then(function(newNote) {
        
        // update tags cache
       // NotesFactory.updateTagsCache(newNote.data.tags[newNote.data.tags.length - 1])
     
        console.log("this is newnote",newNote.data)
        NotesFactory.updateNoteInNotebookCache($scope.curretnNotebook._id, newNote.data, 'update');

        // generate success message
        $scope.tagsavesuccess = "Tag saved successfully!";
        $scope.tagToAdd = "";

      })
      .then(null, function(err) {
          console.error("error saving tag",err)
      })
    }

    $scope.openTagWindow = function() {
      $scope.showTagEditWindow = !$scope.showTagEditWindow;
    }

    $scope.save = function(){ 
      var subjectToSave = $('#notesubject').val();
      var bodyToSave = $('#notebody').val();

      var currentNotebook;
      console.log("tag to save", tagsToSave);
      $scope.savenote = {
        "subject": subjectToSave,
        "body": bodyToSave
      }  

      NotesFactory.getCurrentNotebook()
      .then(function(_currentNotebook){
        currentNotebook = _currentNotebook;
        })
      .then(function(){
        console.log("this is current Notebook, ", currentNotebook);
        return NotesFactory.saveNote(currentNotebook._id,$scope.currentNote()._id, $scope.savenote)
      })
      .then(function(note) {
          $scope.successmessage="Note saved successfully!" + note;
        }, function(err) {
          $scope.errormessage = "Error saving note" + err;
        })    
    }

    $scope.deleteNote = function(noteId) {
      console.log("inside deleteNote")
      NotesFactory.trashNote(noteId);
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

