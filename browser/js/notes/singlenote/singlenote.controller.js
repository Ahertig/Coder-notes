app.controller('SingleNoteCtrl', function($scope, NotesFactory) {
	$scope.savenote = {};
	
	$scope.openTW = false

	var stroutput = "";
	// var userID = $scope.user._id;
    $scope.currentNote = NotesFactory.getCurrentNote;

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
     	$scope.openTW = true;
     }

     // $scope.save = NotesFactory.saveNote;

	$scope.save = function(){ 
		var subjectToSave = $('#notesubject').html();
		console.log("**** here is subjectToSave", subjectToSave)
		// var bodyToSave = $('#notebody').html();
		// var bodyToSave = $('#notebody > textarea').val();
		var bodyToSave = $('#notebody').val();

		$scope.savenote = {
			"subject": subjectToSave,
			"body": bodyToSave
		}
		console.log("scope savenote", $scope.savenote)
		console.log('saving', $scope.savenote)
		$scope.currentNotebook = NotesFactory.getCurrentNotebook();
		NotesFactory.saveNote($scope.currentNotebook._id, $scope.currentNote()._id, $scope.savenote)
		// NotesFactory.saveNote($rootScope.currentNote._id, $scope.savenote)
		 .then(function(note) {
            $scope.successmessage="Note saved successfully!" + note;
        }, function(err) {
            $scope.errormessage = "Error saving note" + err;
		})

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