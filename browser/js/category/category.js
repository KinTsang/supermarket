'use strict'

// app.config(function($stateProvider) {

//     // State for powers list in a specified category
//     $stateProvider.state('category', {
//         url: '/category/:categoryId',
//         templateUrl: 'js/category/category.html',
//         controller: 'CategoryCtrl',
//     });

// });


// // Controller for powers list in a specified category
// app.controller('CategoryCtrl', function($scope, $log, $stateParams, CategoryFactory, PowerFactory) {

//     PowerFactory.fetchAll($stateParams.categoryId)
//         .then(function(foundPowers) {
//             $scope.powers = foundPowers;
//         })
//         .catch($log.error);

//     CategoryFactory.fetchById($stateParams.categoryId)
//         .then(function(foundCategory) {
//             $scope.category = foundCategory;
//         })
//         .catch($log.error);
// });
