'use strict';

app.controller('SignupCtrl', function($scope, UserFactory, AuthService, $state){

  $scope.sendSignup = function(signup){
    var newLogin = {email: signup.email, password: signup.password};
    UserFactory.create(signup)
    .then(function(newUser){
      console.log('Here is new user', newUser);
      return AuthService.login(newLogin);
    })
    .then(function(){
      $state.go('usercontent')
    });
  }
});


app.config(function($stateProvider) {
  $stateProvider.state('signup',{
    url:'/signup',
    templateUrl: '/js/signup/signup.html',
    controller: 'SignupCtrl'
  });
});