app.controller('CommunityCtrl', function($scope, NotesFactory, publicNotes, $stateParams) {

  $scope.publicNotes = publicNotes;
  if (!$scope.searchNotes) {
    $scope.searchNotes = $stateParams.searchTerm;
  }
});

app.controller('NoteCtrl', function($scope, theNote) {
  $scope.note = theNote;
})