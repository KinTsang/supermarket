'use strict'

app.config(function ($stateProvider){
  $stateProvider.state('category', {
    url: '/category/:categoryId',
    templateUrl: 'js/category/category.html',
    controller: 'CategoryCtrl',
  });
});
 //es6 function
app.controller('CategoryCtrl', function ($scope, CategoryFactory, $log, $stateParams){

  CategoryFactory.fetchAll()
  .then(function (foundCategories) {
    $scope.categories = foundCategories;
  })
  .catch($log.error);

  CategoryFactory.fetchById($stateParams.id)
  .then(function (foundPowers) {
    $scope.powers = foundPowers;
    console.log($scope.powers);
  })
  .catch($log.error);
});
