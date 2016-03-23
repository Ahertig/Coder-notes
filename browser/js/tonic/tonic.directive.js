app.directive('tonicDirective', function() {
	return {
		restict: 'E', 
		scope: {
			code: '='
		}, 
		templateUrl: 'js/tonic/tonic.html',
		controller: 'tonicCtrl',
		link: function(scope, element, attributes) {
			var notebook = Tonic.createNotebook({
			    element: document.getElementById("my-element"),
			    source: scope.code || ""
			})
		}

	}
})

app.controller('tonicCtrl', function($scope) {
	$scope.run = false;
	$scope.tonicMsg = 'Run Tonic'
	$scope.evalMsg = 'Run in Eval'
	$scope.eval = false;
	$scope.runTonic = function() {
		if($scope.run)  {
			$scope.run = false;
			$scope.tonicMsg = 'Run in Tonic'
		}
		else {
			$scope.run = true;
			$scope.tonicMsg = 'Hide Tonic'
		}
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
		$scope.evalOutput = eval($scope.evalCode)
		console.log($scope.evalOutput)
	}
})