app.factory("GithubFactory", function($http) {
	var GithubFactory = {};

	GithubFactory.createGist = function(note, headers) {

		return $http({
			method: 'POST', 
			url: 'https://api.github.com/gists',
			headers: headers,
			data: note
		})
		.then(function(response) {
			return response.data
		})
	}

	return GithubFactory
})