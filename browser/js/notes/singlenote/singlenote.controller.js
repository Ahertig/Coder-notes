app.controller('SingleNoteCtrl', function($scope, NotesFactory) {
  	$scope.savenote = {};
	
  	$scope.openTW = false

  	var stroutput = "";
    $scope.currentNote = NotesFactory.getCurrentNote;
    $scope.currentNotebook = NotesFactory.getCurrentNotebook;
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

      $scope.savenote = {
        "subject": subjectToSave,
        "body": bodyToSave
      }  
      NotesFactory.saveNote($scope.currentNotebook()._id, $scope.currentNote()._id, $scope.savenote)
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
})