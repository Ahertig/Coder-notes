app.factory('TagsFactory', function($http, $rootScope) {
	var TagsFactory = {};
	
	TagsFactory.addTag = function(noteId, tag) {
        // var tagToAdd = tagsCache.push(tag)
        $rootScope.currentNote.tags.push(tag);
		return $http.post('/api/note/' +  noteId + '/tags', {tag: tag})
	}

	TagsFactory.removeTag = function(noteId, tag) {
		var index = $rootScope.currentNote.tags.indexOf(tag);
		console.log(index, $rootScope.currentNote.tags)
        $rootScope.currentNote.tags.splice(index, 1)
        console.log(index, $rootScope.currentNote.tags)
		return $http.put('/api/note/' +  noteId + '/tags', {tag: tag})
	}

	return TagsFactory;
})