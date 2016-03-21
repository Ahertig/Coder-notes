app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:'homeCrl'
    });
});

app.controller('homeCrl', function($scope,$window){
	$scope.hljs = $window.hljs;
	$scope.iscode = false;
	$scope.iscodemode = function(){
		$scope.iscode = !$scope.iscode;
		console.log("is codemode");
		
	}
	
})

app.directive('codeMode',function($window){
	return {
		restrict: 'E',
		templateUrl:'js/home/test-highlight.html',
		scope:{
			iscode:'='
		},
		link: function(scope,ele,attr){
			//scope.hljs.initHighlightingOnLoad();

			
			scope.text = ele[0].innerText;
			console.log("element", ele);
			//scope.hljs.highlight('js','scope.text');


		}

	}
})