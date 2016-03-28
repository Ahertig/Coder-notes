// 'use strict'

app.factory('ShareFactory', function($http) {
	var ShareFactory = {};

	ShareFactory.shareNotebook = function(notebook, email) {
		return $http.post('/api/notebooks/' + notebook._id + '/share', {email: email} )
		.then(function(res) {
			return res.data
		})
	}

	ShareFactory.removeNotebookShare = function(notebook, email) {
		return $http.delete('/api/notebooks/' + notebook._id + '/share', {email: email} )
		.then(function(res) {
			console.log('successfully removed share: ', res.data)
			return res.data
		})
	}

	return ShareFactory;
})