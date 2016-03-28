app.factory("GithubFactory", function($http) {
	var GithubFactory = {};

	// GithubFactory.createGist = function(note, headers) {
	// 	console.log('headers is : ', headers)
	// 	return $http.post('https://api.github.com/gists', note, headers)
	// 	.then(function(response) {
	// 		console.log(response.data)
	// 		return response.data
	// 	})
	// }


	GithubFactory.createGist = function(note, headers) {

		return $http({
			method: 'POST', 
			url: 'https://api.github.com/gists',
			headers: { 'Authorization': 'token df49b06200366cb23f2e1edfd07ebd75f257a746' },
			data: note
		})
		.then(function(response) {
			console.log(response.data)
			return response.data
		})
	}

	return GithubFactory
})