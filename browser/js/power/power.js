'use strict';

app.config(function($stateProvider){

  $stateProvider.state('powerList', {
    url: '/powers/all',
    templateUrl: 'js/power/power.list.html',
    controller: 'PowerCtrl',
    resolve: {
      powerInfo: function($http){
        return $http.get('/api/powers/all').then(function(powerinfo){
          console.log('This is the info for the power: ', powerinfo.data)
          return powerinfo.data;
        });
      },
      categoryInfo: function($http){
        return $http.get('api/categories/')
        .then(allCategories => {
          console.log('This is the info for all Categories: ', allCategories.data)
          return allCategories.data
        })
      }
    }
  })

  //state to create product
  $stateProvider.state('createPower', {
    url: '/powers/create',
    templateUrl: 'js/power/power.add.html',
    controller: 'PowerCtrl',
    resolve: {
      powerInfo: function(){ //this resolve exist to prevent creating another controller.
        return null;
      },
      categoryInfo: function($http){
        return $http.get('api/categories/')
        .then(allCategories => {
          console.log('This is the info for all Categories: ', allCategories.data)
          return allCategories.data
        })
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
      },
      categoryInfo: function($http){
        return $http.get('api/categories/')
        .then(allCategories => {
          console.log('This is the info for all Categories: ', allCategories.data)
          return allCategories.data
        })
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
      },
      categoryInfo: function($http){
        return $http.get('api/categories/')
        .then(allCategories => {
          console.log('This is the info for all Categories: ', allCategories.data)
          return allCategories.data
        })
      }
    }
  });

})

app.controller('PowerCtrl', function($scope, powerInfo, updatePowerFactory, createPowerFactory, categoryInfo, $state){
  $scope.powerInfo = powerInfo;

  $scope.categoryInfo = categoryInfo;

  $scope.updateInfo = powerInfo;

  $scope.created = false;

  $scope.updatePosting = function(updateInfo){
    console.log('invoking updatePosting function', updateInfo)
    updatePowerFactory.updatePosting(updateInfo)
    .then(function(updatedPower){
      console.log('The updated power is :', updatedPower.data)
      $state.go('powerList');
    })
  }

  $scope.createNewPower = function(newPower){

    createPowerFactory.createNewPower(newPower)
    .then(function(createdPower){
      console.log('The created power is: ', createdPower)
      $scope.newPower = {};
      $scope.created = true;

    })
  }
})


app.factory('updatePowerFactory', function($http){

    var object = {};

    object.updatePosting = function(powerInfo){
        return $http.put('api/powers/' + powerInfo.id, powerInfo)
    }

    return object;
})

app.factory('createPowerFactory', function($http){
  var object = {};

  object.createNewPower = function(newPower){
        console.log('invoked createNewPower function in factory createPower: ', newPower)
    return $http.post('/api/powers/create', newPower)
  }

  return object;
})
