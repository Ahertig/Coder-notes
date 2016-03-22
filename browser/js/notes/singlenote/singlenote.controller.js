app.controller('SingleNoteCtrl', function($scope, $rootScope, NotesFactory) {
	$scope.savenote = {};
	
	var stroutput = "";
	var userID = $scope.user._id;
	var noteID = $rootScope.currentNote._id;
	var notebookID = $rootScope.currentNotebook._id;

	//console.log("user ID, Note ID and NotebookID",userID, noteID);
    $scope.save = function(){ 
    	var childArray = $('article').children();
		// var childArray = $('article').children().outerHTML();
		// console.log("Here is the text:",text)
		for(var i = 0; i < childArray.length; i++) {
		    stroutput += childArray[i].outerHTML;
		 }
		$scope.savenote = {
			"subject": $rootScope.currentNote.subject,
			"body": stroutput
		}
    	console.log("update note: stroutput:",stroutput, "savenote:",$scope.savenote )
    	// console.log("NotebookID",$rootScope.currentNotebook._id);
     	NotesFactory.saveNote(userID, notebookID,noteID, $scope.savenote);
     }
	

})