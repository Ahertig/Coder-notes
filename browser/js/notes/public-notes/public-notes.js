app.config(function ($stateProvider) {
  var currentUser;

  // this is the main state to show user content.
  $stateProvider.state('community', {
    url: '/public/:searchTerm',
    templateUrl: 'js/notes/public-notes/public-notes.html',
    controller: 'CommunityCtrl',
    resolve: {
      publicNotes: function(NotesFactory) {
        return NotesFactory.fetchPublicNotes();
      }
      // noteAuthors: function() {

      // }
    }
  })
  .state('note', {
    url: '/public/:id',
    templateUrl: '/js/notes/public-notes/public-notes.note.html',
    controller: 'NoteCtrl',
    resolve: {
      theNote: function(NotesFactory, $stateParams){
        return NotesFactory.getNote($stateParams.id)
      }
    }
  });

});
