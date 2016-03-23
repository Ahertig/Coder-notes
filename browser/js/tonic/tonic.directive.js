app.directive('tonicDirective', function() {
	return {
		restict: 'E', 
		scope: {
			code: '='
		}, 
		templateUrl: 'js/tonic/tonic.html',
		controller: 'tonicCtrl'
		// link: function(scope, element, attributes) {
		// 		console.log(scope.code)
		// 	var notebook = Tonic.createNotebook({
		// 	    element: document.getElementById("my-element"),
		// 	    source: "function fun() { return 'not fun'} fun()"
		// 	})		
		// }

	}
})

app.factory('TonicFactory', function() {
	var TonicFactory = {};

	TonicFactory.getSelectionText = function() {
	    var text = "";
	    if (window.getSelection) {
	        text = window.getSelection().toString();
	    } else if (document.selection && document.selection.type != "Control") {
	        text = document.selection.createRange().text;
	    }
	    return text;
	}

	return TonicFactory;
})

app.controller('tonicCtrl', function($scope, TonicFactory) {
	$scope.run = false;
	$scope.tonicMsg = 'Run Tonic'
	$scope.evalMsg = 'Run in Eval'
	$scope.eval = false;

	$scope.selectedText = "function fun() { return 'having fun'} fun()";
	console.log($scope.selectedText)
	 //TonicFactory.getSelectionText()

	$scope.runTonic = function() {
		if($scope.run)  {
			$scope.run = false;
			$scope.tonicMsg = 'Run in Tonic'
		}
		else {
			$scope.run = true;
			$scope.tonicMsg = 'Hide Tonic'
		}

		document.getElementById("my-element").innerHTML = "";
		var notebook = Tonic.createNotebook({
		    element: document.getElementById("my-element"),
		    source: TonicFactory.getSelectionText()
		})

	}
	$scope.showEval = function() {
		if($scope.eval)  {
			$scope.eval = false;
			$scope.evalMsg = 'Run in Eval'
		}
		else {
			$scope.eval = true;
			$scope.evalMsg = 'Hide Eval'
		}
	}

	$scope.runEval = function() {

			$scope.evalOutput = eval(TonicFactory.getSelectionText())
	}
})






