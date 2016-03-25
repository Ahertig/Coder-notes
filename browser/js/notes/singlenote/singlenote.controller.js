app.controller('SingleNoteCtrl', function($scope, NotesFactory) {
  	$scope.savenote = {};
	
  	$scope.showTagEditWindow = false

  	var stroutput = "";
    $scope.currentNote = NotesFactory.getCurrentNote;

    $scope.showmarkdown = false;
    $scope.successmessage = null;

    $scope.removeTag = function(noteId, tag) {
      NotesFactory.removeTag(noteId, tag);
    }

    $scope.addTag = function(noteId, tag) {
      console.log("running addTag", noteId, tag)
      NotesFactory.addTag(noteId, tag)
      .then(function(newNote) {
        console.log("saved note with new tag tag",newNote.data);

        // update tags cache
        NotesFactory.updateTagsCache(newNote.data.tags[newNote.data.tags.length - 1])

        var currentNotebook = NotesFactory.findParentNotebook(noteId) 

        // update Notes cache
        NotesFactory.updateNoteInNotebookCache(currentNotebook, newNote, 'update');

      }, function(err) {
        console.error("error saving tag",err)
      })
    }

    $scope.openTagWindow = function() {
      $scope.showTagEditWindow = !$scope.showTagEditWindow;
    }

    $scope.save = function(){ 
      var subjectToSave = $('#notesubject').html();
      var bodyToSave = $('#notebody').val();

      $scope.savenote = {
        "subject": subjectToSave,
        "body": bodyToSave
      }

      $scope.currentNotebook = NotesFactory.getCurrentNotebook();

      NotesFactory.saveNote($scope.currentNotebook._id, $scope.currentNote()._id, $scope.savenote)
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