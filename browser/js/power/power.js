'use strict';

app.config(function($stateProvider){

  //state to populate a specific power given an powerId.
  $stateProvider.state('power', {
    url: '/powers/:powerId',
    templateUrl: 'js/power/power.html',
    controller: 'PowerCtrl',
    resolve: {
      powerInfo: function($http, $stateParams){
        return $http.get('/api/powers/' + $stateParams.powerId).then(function(powerinfo){
          console.log("This is the info for the power: ", powerinfo.data)
          return powerinfo.data;
        });
      }
    }
  });

  //state to update product
  $stateProvider.state('editPower', {
    url: '/powers/update/:powerId',
    templateUrl: 'js/power/power.edit.html',
    controller: 'PowerCtrl',
    resolve: {
      powerInfo: function($http, $stateParams){
        return $http.get('/api/powers/' + $stateParams.powerId)
        .then(function(powerInfo){
          console.log('This is the info for the power: ', powerInfo.data);
          return powerInfo.data;
        })
      }
    }
  })
})

app.controller('PowerCtrl', function($scope, powerInfo, updatePower){
  $scope.powerInfo = powerInfo;

  $scope.updateInfo = $scope.powerInfo

  $scope.updatePosting = function(updateInfo){

    console.log('invoking updatePosting function', updateInfo)

    updatePower.updatePosting(updateInfo)
    .then(function(updatedPower){

      console.log('The updated power is :', updatedPower.data)
    })
  }
})
