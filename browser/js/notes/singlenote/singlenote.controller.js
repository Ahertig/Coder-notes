app.controller('SingleNoteCtrl', function($scope, $rootScope, NotesFactory) {
	$scope.savenote = {};
	
	$scope.openTW = false

	var stroutput = "";
	var userID = $scope.user._id;

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
		var bodyToSave = $('.zp2 > article').html();

		$scope.savenote = {
			"subject": subjectToSave,
			"body": bodyToSave
		}

		NotesFactory.saveNote(userID, $rootScope.currentNotebook._id,$rootScope.currentNote._id, $scope.savenote)
		 .then(function() {
            $scope.successmessage="Note saved successfully!";
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