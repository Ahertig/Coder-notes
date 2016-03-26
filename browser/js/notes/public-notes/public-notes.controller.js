app.controller('CommunityCtrl', function($scope, NotesFactory, publicNotes) {

  $scope.publicNotes = publicNotes;

});

app.controller('NoteCtrl', function($scope, theNote) {

  $scope.note = theNote;
  console.log('$scope.note', $scope.note)

})
