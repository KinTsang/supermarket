'use strict';

app.config(function($stateProvider){

  //state to create product
  $stateProvider.state('createPower', {
    url: '/powers/create',
    templateUrl: 'js/power/power.add.html',
    controller: 'PowerCtrl',
    resolve: {
      powerInfo: function(){
        return null;
      }
    }
  });

  //state to populate a specific power given an powerId.
  $stateProvider.state('power', {
    url: '/powers/:powerId',
    templateUrl: 'js/power/power.html',
    controller: 'PowerCtrl',
    resolve: {
      powerInfo: function($http, $stateParams){
        return $http.get('/api/powers/' + $stateParams.powerId).then(function(powerinfo){
          console.log('This is the info for the power: ', powerinfo.data)
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
  });

})

app.controller('PowerCtrl', function($scope, powerInfo, updatePowerFactory, createPowerFactory){
  $scope.powerInfo = powerInfo;

  $scope.updateInfo = $scope.powerInfo;

  $scope.updatePosting = function(updateInfo){

    console.log('invoking updatePosting function', updateInfo)

    updatePowerFactory.updatePosting(updateInfo)
    .then(function(updatedPower){

      console.log('The updated power is :', updatedPower.data)
    })
  }

  $scope.createNewPower = function(newPower){

    createPowerFactory.createNewPower(newPower)
    .then(function(createdPower){
      console.log('The created power is: ', createdPower)
    })
  }
})


app.factory('updatePowerFactory', function($http, $log){

    var object = {};

    object.updatePosting = function(powerInfo){
        return $http.put('api/powers/' + powerInfo.id, powerInfo)
    }

    return object;
})

app.factory('createPowerFactory', function($http, $log){
  var object = {};

  object.createNewPower = function(newPower){
        console.log('invoked createNewPower function in factory createPower')
    return $http.post('/api/powers/create', newPower)
  }

  return object;
})
