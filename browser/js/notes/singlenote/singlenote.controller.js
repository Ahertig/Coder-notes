app.controller('SingleNoteCtrl', function($scope, NotesFactory, TonicFactory) {
  	$scope.savenote = {};
	
  	$scope.openTW = false

  	var stroutput = "";
    $scope.currentNote = NotesFactory.getCurrentNote;
    //$scope.currentNotebook = NotesFactory.getCurrentNotebook;
    $scope.showmarkdown = false;
    $scope.successmessage = null;

    $scope.removeTag = function(noteId, tag) {
      NotesFactory.removeTag(noteId, tag);
    }
    $scope.addTag = function(noteId, tag) {
      NotesFactory.addTag(noteId, tag);
      $scope.openTW = false;
    }

    $scope.openTagWindow = function() {
      $scope.openTW = !$scope.openTW;
    }

    $scope.save = function(){ 
      var subjectToSave = $('#notesubject').html();
      var bodyToSave = $('#notebody').val();
      var currentNotebook;
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
    document.getElementById("close-tonic-btn").innerHTML = "";
  }

  $scope.runTonic = function() {
        $scope.tonic = true;
        document.getElementById("my-element").innerHTML = "";
        document.getElementById("close-tonic-btn").innerHTML = "";
        document.getElementById("close-tonic-btn").innerHTML = "<button>close tonic</button>";

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

