app.controller('SingleNoteCtrl', function($scope, $rootScope, NotesFactory) {
	$scope.savenote = {};
	
	$scope.openTW = false

	var stroutput = "";
	var userID = $scope.user._id;

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

		// this needs to be fixed... 

		var stroutput;

		console.log("* saving...current note is", $rootScope.currentNote._id)
		console.log("** current notebook is ", $rootScope.currentNotebook._id)

		// var childArray = $('article').children();

		// console.log("here is childArray", childArray)

		// for(var i = 0; i < childArray.length; i++) {
			// stroutput += childArray[i].innerHTML();
		// }

		// var stroutput = $('article').html();

		console.log("subject is", $rootScope.currentNote.subject)
		// console.log("stroutput is",stroutput)

		$scope.savenote = {
			"subject": $rootScope.currentNote.subject,
			"body": $rootScope.currentNote.body
			// "body": stroutput
		}

		// console.log("update note: stroutput:",stroutput, "savenote:",$scope.savenote )
	NotesFactory.saveNote(userID, $rootScope.currentNotebook._id,$rootScope.currentNote._id, $scope.savenote);
	}



})