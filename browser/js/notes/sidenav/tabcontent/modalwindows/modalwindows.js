app.directive('deletenotebookmodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/notes/sidenav/tabcontent/modalwindows/deletenotebookmodal.html',
		controller: 'SidenavCtrl'
	}
});

app.directive('sharemodal', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/notes/sidenav/tabcontent/modalwindows/sharenotebookmodal.html',
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