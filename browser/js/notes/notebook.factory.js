app.factory('NotebookFactory', function($http, $q){

	var currentNotebook,
    sharedNotebookCache = [], 
    notebookCache = [];

	var notebookAPI = {
	  resetNotebookCache: function(){
      currentNotebook = undefined;
      sharedNotebookCache = [];
      notebookCache = [];
    },

		getCurrentNotebook: function() {
			if (currentNotebook) return $q.when(currentNotebook);
			else {
				return notebookAPI.fetchMyNotebooks()
				.then(function(notebooks) {
          currentNotebook = notebooks[0]
          return currentNotebook;
				})
			}
		},
    getCurrentNotebookSync: function(){
      return currentNotebook;
    },

    setCurrentNotebook: function(_currentNotebook) {
      currentNotebook = _currentNotebook;
    }, 

    getCachedNotebooks: function() {
      return notebookCache;
    }, 

    findNotebookById: function(notebookId) {
      return _.find(notebookCache, function(notebook){
        return notebook._id === notebookId;
      })
    },

    addToNotebookCache: function(notebook){
      notebookCache.unshift(notebook)
    },

    updateNotebookCache: function(notebook){
      var foundNotebook = notebookAPI.findNotebookById(notebook._id)
      foundNotebook = notebook;
    },

    removeNotebookFromCache: function(notebook){
      _.remove(notebookCache, function(n){
        return n._id === notebook._id;
      })
    }, 

    fetchMyNotebooks: function() {
      return $http.get('/api/notebooks')
      .then(function(response) {
        notebookCache = response.data;
        return notebookCache;
      })
    }, 

    fetchMySharedNotebooks: function() {
      return $http.get('/api/notebooks/shared')
      .then(function(response) {
        sharedNotebookCache = response.data;
        return sharedNotebookCache;
      })
    }, 

    createNotebook: function(title) {
      return $http.post('/api/notebooks/', {title: title})
      .then(function(response) {
        notebookAPI.addToNotebookCache(response.data);
        return response.data;
      })
    }, 

    removeNotebook: function(notebook){
      return $http.put('/api/notebooks/' + notebook._id + '/trash/add')
      .then(function(response){
        notebookAPI.updateNotebookCache(response.data);
      })
    }, 

    restoreNotebook: function(notebook){
      return $http.put('/api/notebooks/' + notebook._id + '/trash/remove')
      .then(function(response){
        notebookAPI.updateNotebookCache(response.data);
      })
    }, 

    findParentNotebook: function(noteId) {
      for (var i = 0; i < notebookCache.length; i++) {
        for (var j = 0; j < notebookCache[i].notes.length; j++) {
          if (notebookCache[i].notes[j]._id === noteId) {
            return notebookCache[i]._id;
          }
        }
      }
    }
	
  }

  return notebookAPI;
})