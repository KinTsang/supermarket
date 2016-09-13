'use strict';

app.config(function($stateProvider){

  //state to populate a specific power given an powerId.
  $stateProvider.state('power', {
    url: '/powers/:powerId',
    templateUrl: 'js/power/power.html'
    // resolve: {
    //   powerInfo: function($http, $stateParams){
    //     return $http.get('/api/powers/' + $stateParams.powerId).then(function(powerinfo){
    //       console.log("This is the info for the power: ", powerinfo.data)
    //       return powerinfo.data
    //     });
    //   }
    // }
  });

})

app.controller('PowerCtrl', function($scope, powerInfo){
  $scope.powerInfo = powerInfo;

})
