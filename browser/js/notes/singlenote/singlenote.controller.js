app.controller('SingleNoteCtrl', function($scope, $rootScope, NotesFactory) {
	$scope.savenote = {};
	
	$scope.openTW = false

	var stroutput = "";
	var userID = $scope.user._id;
	var noteID = $rootScope.currentNote._id;
	var notebookID = $rootScope.currentNotebook._id;


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

    $scope.save = function(){ 
    	var childArray = $('article').children();
		for(var i = 0; i < childArray.length; i++) {
		    stroutput += childArray[i].outerHTML;
		 }
		$scope.savenote = {
			"subject": $rootScope.currentNote.subject,
			"body": stroutput
		}
    	console.log("update note: stroutput:",stroutput, "savenote:",$scope.savenote )
     	NotesFactory.saveNote(userID, notebookID,noteID, $scope.savenote);
     }



})