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

  CategoryFactory.fetchItemsById($stateParams.categoryId)
    .then(function (foundPowers) {
      $scope.powers = foundPowers;
  })
  .catch($log.error);

  CategoryFactory.fetchCatById($stateParams.categoryId)
    .then(function (foundCategory) {
      console.log(foundCategory);
      $scope.category = foundCategory;
    })
    .catch($log.error);
});

app.controller('CatBarCtrl', function($scope, CategoryFactory, $log, $stateParams){
  CategoryFactory.fetchAll()
    .then(function (foundCategories) {
      $scope.categories = foundCategories;
  })
  .catch($log.error);
})
