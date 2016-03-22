app.directive('tonicDirective', function() {
	return {
		restict: 'E', 
		scope: {
			code: '='
		}, 
		templateUrl: 'js/tonic/tonic.html',
		link: function(scope, element, attributes) {
			var notebook = Tonic.createNotebook({
			    element: document.getElementById("my-element"),
			    source: scope.code || ""
			})
		}

	}
})
<tonic-directive></tonic-directive>