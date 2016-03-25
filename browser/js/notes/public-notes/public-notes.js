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
  });
});

app.controller('CommunityCtrl', function($scope, NotesFactory, publicNotes) {

  $scope.publicNotes = publicNotes;

});
