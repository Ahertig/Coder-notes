app.factory('TagsFactory', function($http) {
	var TagsFactory = {};

	TagsFactory.addTag = function(userId, tag) {
		return $http.post('/api/' +  userId + '/usernotes/tags', tag)
	}
	return TagsFactory;
})