app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('SearchCtrl', function($scope, $state) {
  $scope.search = function() {
    $state.go('community', {searchTerm: $scope.searchTerm})
  }

})