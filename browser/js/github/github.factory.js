app.factory("GithubFactory", function($http) {
	var GithubFactory = {};

	GithubFactory.createGist = function(note) {
		return $http.post('/api/createGist', note)
		.then(function(res) {
			console.log(res.data)
      // AW: return res.data?
		})
	}

	return GithubFactory

  // AW: could just write this factory like this: 
  
  // return {

  //   createGist: function(note) {
  //     return $http.post('/api/createGist', note)
  //     .then(function(res) {
  //       console.log(res.data)
  //       // AW: return res.data?
  //     })
  //   }

  // }


})