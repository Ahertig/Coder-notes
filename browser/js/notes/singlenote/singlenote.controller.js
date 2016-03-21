app.controller('SingleNoteCtrl', function($scope, $rootScope) {
	$scope.consolelogdom = function() {
		var childArray = $('article').children();
		// var childArray = $('article').children().outerHTML();
		var stroutput = "";
		// console.log("Here is the text:",text)
		for(var i = 0; i < childArray.length; i++) {
			// console.log("child",i,"is",childArray[i].html());
				// console.log("child",i,"is",childArray[i]);
				console.log("outerhtml",childArray[i].outerHTML)
				stroutput += childArray[i].outerHTML;
			// console.log("childArray is", childArray)
			// console.log("childArray[1] is", childArray[1])
		}
		console.log("final string output",stroutput)
		// console.log("entire childArray",childArray)
	}

	$scope.save = function() {
		
	}

})