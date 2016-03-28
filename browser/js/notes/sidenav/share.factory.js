// 'use strict'

app.factory('ShareFactory', function($http) {
	var ShareFactory = {};

	ShareFactory.shareNotebook = function(notebook, email) {
		console.log('sharing factorys email: ', email)
		return $http.post('/api/notebooks/' + notebook._id + '/share', {email: email} )
		.then(function(res) {
			console.log("banana: ", res.data)
			return res.data
		})
	}

	return ShareFactory;
})