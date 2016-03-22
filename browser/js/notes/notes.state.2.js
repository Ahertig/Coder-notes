app.config(function ($stateProvider) {

  $stateProvider.state('usercontent', {
    url: '/notes',
    templateUrl: 'js/notes/notes.html',
    controller: 'NotesCtrl',
    resolve: {
      currentUser: function(AuthService){
        return AuthService.getLoggedInUser()
      },

      allMyStuff: function(currentUser, NotesFactory) {
        return $q.all([
          NotesFactory.fetchMyNotebooks(currentUser._id), 
          NotesFactory.fetchMySharedNotebooks(currentUser._id), 
          NotesFactory.fetchMyTags(currentUser._id), 
          NotesFactory.fetchMyNotes(currentUser._id)
        ])
        .then(function(arrayOfPromises){
          return {
            myNotebooks: arrayOfPromises[0],
            mySharedNotebooks: arrayOfPromises[1], 
            myTags: arrayOfPromises[2], 
            myNotes: arrayOfPromises[3]
          }
        })
      }
    }
    
});