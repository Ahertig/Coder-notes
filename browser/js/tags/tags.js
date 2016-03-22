app.factory('TagsFactory', function($http) {
	var TagsFactory = {};
	var tagsCache = [];

	function setCache(obj) {
        angular.copy(obj, tagsCache)
        return cache;
    }


	TagsFactory.fetchMyTags = function(userId) {
		return $http.get('/api/users/'+ userId + '/tags')
		.then(function(response) {
			return response.data;
		})	
		.then(setCache)
	}

	TagsFactory.removeTag = function(noteId, tag) {
		var index = tagsCache.indexOf(tag);
        var tagToRemove = tagsCache.splice(index, 1)
		return $http.put('/api/note/' +  noteId + '/tags', {tag: tag})
	}

	return TagsFactory;
})