app.controller('SingleNoteCtrl', function($scope, $rootScope, NotesFactory) {
	$scope.savenote = {};
	
	$scope.stroutput = "";

	$scope.consolelogdom = function() {
		var childArray = $('article').children();
		// var childArray = $('article').children().outerHTML();
		
		// console.log("Here is the text:",text)
		for(var i = 0; i < childArray.length; i++) {
		// 	// console.log("child",i,"is",childArray[i].html());
		// 		// console.log("child",i,"is",childArray[i]);
		 	
		 	
		    $scope.stroutput += childArray[i].outerHTML;
		    console.log("outerhtml",$scope.stroutput);
		// 	// console.log("childArray is", childArray)
		// 	console.log("childArray", i ,"is", childArray[i].innerHTML)
		 }
		// //console.log("final string output",childArray)
		// console.log("entire childArray",childArray)
		//console.log("user ID, Note ID and NotebookID",$scope.user._id,$scope.currentNote._id,$scope.notebook._id);
		//console.log("UserID, currentNoteID,currentNotebookID ", $scope.user._id,$rootScope.currentNote._id,$rootScope.currentNotebook._id); 

		//console.log("user ID, Note ID and NotebookID",$scope.currentNote._id,$rootScope.notebook._id);
		console.log("final string",$scope.stroutput)
	}
	

	// $scope.save = function() {
		
	// }
	// $scope.savenote.subject = $rootScope.currentNote.subject;
	// $scope.savenote.body = $scope.stroutput;
	// $scope.savenote.lastUpdate = new Date()



	var userID = $scope.user._id;
	var noteID = $rootScope.currentNote._id;
	var notebookID = $rootScope.currentNotebook._id;

	//console.log("user ID, Note ID and NotebookID",userID, noteID);
    $scope.save = function(){ 
		$scope.savenote = {
			"subject": $rootScope.currentNote.subject,
			"body": $scope.stroutput
		}
    	console.log("update note: stroutput:",$scope.stroutput, "savenote:",$scope.savenote )
    	// console.log("NotebookID",$rootScope.currentNotebook._id);
     	NotesFactory.saveNote(userID, notebookID,noteID, $scope.savenote);
     }
	

})