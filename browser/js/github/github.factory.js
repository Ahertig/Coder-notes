app.factory("GithubFactory", function($http) {
	var GithubFactory = {};

	GithubFactory.createGist = function(note) {
		return $http.post('/api/createGist', note)
		.then(function(res) {
			console.log(res.data)
		})
	}

	return GithubFactory
})