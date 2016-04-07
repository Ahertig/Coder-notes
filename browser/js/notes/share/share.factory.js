// 'use strict'

app.factory('ShareFactory', function($http) {
	var ShareFactory = {};

	ShareFactory.shareNotebook = function(notebook, email) {
		return $http.put('/api/notebooks/' + notebook._id + '/share', {email: email} )
		.then(function(res) {
			return res.data
		}, function (err) {
			return err.data;
		})
	}

	ShareFactory.removeNotebookShare = function(notebook, email) {
		return $http.put('/api/notebooks/' + notebook._id + '/removeshare', {email: email} )
		.then(function(res) {
			return res.data
		}, function (err) {
			return err.data;
		})
	}

	return ShareFactory;
})