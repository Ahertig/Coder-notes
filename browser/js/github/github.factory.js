app.factory("GithubFactory", function($http) {
	var GithubFactory = {};

	GithubFactory.createGist = function(note) {
		var newGist = {
          "description": note.subject,
          "public": false,
          "files": {
            "file1.txt": {
              "content": note.body
            }
          }
        }
		return $http.post('/api/createGist', newGist)
		.then(function(res) {
			console.log(res.data)
		})
	}

	return GithubFactory
})