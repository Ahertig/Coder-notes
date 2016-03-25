app.config(function ($stateProvider) {
  var currentUser;

  // this is the main state to show user content.
  $stateProvider.state('community', {
    url: '/public',
    templateUrl: 'js/notes/public-notes/public-notes.html',
    controller: 'CommunityCtrl',
    resolve: {
      publicNotes: function(NotesFactory) {
        return NotesFactory.fetchPublicNotes();
      }
    }
  })
  .state('note', {
    url: '/public/:id',
    templateUrl: '/js/notes/public-notes/public-notes.note.html',
    controller: 'NoteCtrl',
    resolve: {
      theNote: function(NotesFactory, $stateParams){
        console.log('here is state params', $stateParams)
        return NotesFactory.getNote($stateParams.id)
      }
    }
    // controller: function($scope, $stateParams) {
    //   console.log('getting here', $stateParams.id);
    //   $scope.note = $scope.publicNotes[$stateParams.id];
    // }
  });

});
