app.directive('deletemodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/notes/sidenav/tabcontent/modalwindows/deletemodal.html',
		controller: 'SidenavCtrl'
	}
});

app.directive('sharemodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/notes/sidenav/tabcontent/modalwindows/sharemodal.html',
		controller: 'SidenavCtrl'
	}
});

app.directive('editnotebookmodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/notes/sidenav/tabcontent/modalwindows/editnotebookmodal.html',
		controller: 'SidenavCtrl'
	}
});