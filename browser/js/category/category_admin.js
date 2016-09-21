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
    CategoryFactory.editName(categoryId, category)
    .then(() => $state.reload());
  };

  $scope.deleteCategory = function (id) {
    return CategoryFactory.deleteCategory(id)
    .then(() => $state.reload());
  };

  $scope.isActive = function (categoryId, status){
    CategoryFactory.editStatus(categoryId, status)
    .then(() => $state.reload());
  };

  $scope.addCategory = function (category) {
    CategoryFactory.createCategory(category)
    .then(() => $state.reload());
  };

  $scope.categoryForm = false;

  $scope.showForm = function () {
    $scope.categoryForm = !$scope.categoryForm;
  }

});
