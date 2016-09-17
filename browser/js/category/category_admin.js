app.config(function ($stateProvider){
  $stateProvider.state('categoryadmin', {
    url: '/admin/category',
    templateUrl: 'js/category/category_admin.html',
    controller: 'AdminCategoryCtrl',
  })
  .state('editcategory', {
    url: '/admin/category/edit/:categoryId',
    templateUrl: 'js/category/category_admin_edit.html',
    controller: 'AdminCategoryCtrl',
  })
  .state('addcategory', {
    url: '/admin/category/add',
    templateUrl: 'js/category/category_admin_add.html',
    controller: 'AdminCategoryCtrl'
  })
});


app.controller('AdminCategoryCtrl', function ($scope, CategoryFactory, $log, $stateParams, $state) {

  // $scope.category = category;
  CategoryFactory.fetchAll()
  .then(function (foundCategories){
    $scope.categories = foundCategories;
  })

  $scope.editCategory = function (categoryId, category){
    CategoryFactory.editCategory(categoryId, category)
    .then(() => $state.go('categoryadmin'));
  };

  $scope.deleteCategory = function (id) {
    return CategoryFactory.deleteCategory(id)
    .then(() => $state.reload());
  };

  $scope.isActive = function (categoryId, status){
    CategoryFactory.editStatus(categoryId, status)
    .then(() => $state.go('categoryadmin'));
  };

  $scope.addCategory = function (category) {
    CategoryFactory.createCategory(category)
    .then(() => $state.go('categoryadmin'));
  };

  // $scope.statuses = [
  //   {value: 1, text: 'status1'},
  //   {value: 2, text: 'status2'}
  // ];

  // $scope.showStatus = function() {
  //   var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
  //   return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
  // }

});
