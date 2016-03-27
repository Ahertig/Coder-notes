app.factory("GithubFactory", function($http) {
	var GithubFactory = {};

	GithubFactory.createGist = function(note) {
		$http.post('http://api.github.com/gists', note)
		// $http.post('/creategist')
		.then(function(response) {
			return response.data
		})
	}

	return GithubFactory
})