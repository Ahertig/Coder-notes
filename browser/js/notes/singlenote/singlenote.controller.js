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

		console.log("* saving...current note is", $rootScope.currentNote._id)
		console.log("** current notebook is ", $rootScope.currentNotebook._id)

		var subjectToSave = $('.zp1 > article').html();
		var bodyToSave = $('.zp2 > article').html();

		console.log("saving... subject is", subjectToSave)
		console.log("saving ... body is",bodyToSave)

		$scope.savenote = {
			"subject": subjectToSave,
			"body": bodyToSave
		}

	NotesFactory.saveNote(userID, $rootScope.currentNotebook._id,$rootScope.currentNote._id, $scope.savenote);
	}



})