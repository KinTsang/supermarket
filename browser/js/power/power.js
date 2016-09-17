'use strict';

app.config(function($stateProvider) {

    //state to for admin to manage all powers
    $stateProvider.state('powerList', {
        url: '/admin/powers/',
        templateUrl: 'js/power/power.list.html',
        controller: 'PowerCtrl',
        resolve: {
            powerInfo: PowersFactory => PowersFactory.fetchAll(),
            categoryInfo: CategoryFactory => CategoryFactory.fetchAll()
        }
    })

    //state to create product
    $stateProvider.state('createPower', {
        url: '/powers/create',
        templateUrl: 'js/power/power.add.html',
        controller: 'PowerCtrl',
        resolve: {
            powerInfo: () => null, //this resolve exists to meet controller injection requirements
            categoryInfo: CategoryFactory => CategoryFactory.fetchAll()
        }
    });

    //state to populate a specific power given an powerId.
    $stateProvider.state('power', {
        url: '/powers/:powerId',
        templateUrl: 'js/power/power.html',
        controller: 'PowerCtrl',
        resolve: {
            powerInfo: (PowersFactory, $stateParams) => PowersFactory.fetchById($stateParams.powerId),
            categoryInfo: CategoryFactory => CategoryFactory.fetchAll()
        }
    });

    //state to update product
    $stateProvider.state('editPower', {
        url: '/powers/update/:powerId',
        templateUrl: 'js/power/power.edit.html',
        controller: 'PowerCtrl',
        resolve: {
            powerInfo: (PowersFactory, $stateParams) => PowersFactory.fetchById($stateParams.powerId),
            categoryInfo: CategoryFactory => CategoryFactory.fetchAll()
        }
    });

})

app.controller('PowerCtrl', function($scope, powerInfo, PowerFactory, categoryInfo, $state) {
    $scope.powerInfo = powerInfo;
    $scope.categoryInfo = categoryInfo;
    $scope.updateInfo = powerInfo;
    $scope.created = false;

    $scope.updatePosting = function(updateInfo) {
        PowerFactory.update(updateInfo)
            .then(updatedPower => $state.go('powerList'))
    }

    $scope.createNewPower = function(newPower) {
        PowerFactory.create(newPower)
            .then(function(createdPower) {
                $scope.newPower = {};
                $scope.created = true;

            })
    }
})
