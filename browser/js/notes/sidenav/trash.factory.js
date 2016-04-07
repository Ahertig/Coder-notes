app.factory('TrashFactory', function($http) {
	var TrashFactory = {};

	TrashFactory.clearTrash = function() {
		return $http.delete('/api/trash')
		.then(function(response) {
			return response.data;
		})
	}
 	
 	return TrashFactory;

})