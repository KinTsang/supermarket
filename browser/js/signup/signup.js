'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signup.html',
    controller: 'SignupCtrl'
  });
});

app.directive('compareTo', function (){
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      otherValue: '=compareTo'
    },
    link: function (scope, element, attr, ngModel) {
      ngModel.$validators.compareTo = function(value){
        return value === scope.otherValue;
      }
       scope.$watch('otherValue', function () {
        ngModel.$validate();
       });
    }
  }
});


app.controller('SignupCtrl', function($scope, AuthFactory, $state, $log, AuthService){
  $scope.submitSignup = function(form){
    AuthFactory.createUser(form)
      .then(AuthService.login(form)
            .then(function () {
              console.log('here');
              $state.go('home');
            }))
      .catch($log.error);
  };
});


//TLEE: unncessary parameter new user. how to create es6 function without arguments
