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

  $scope.editCategory = function (id, category){
    CategoryFactory.editCategory(id, category)
    .then(category => $state.go('categoryadmin'));
  };

  $scope.deleteCategory = function (id) {
    return CategoryFactory.deleteCategory(id)
    .then(function () {
      console.log('go');
      $state.go('categoryadmin');
    })
  };

  $scope.addCategory = function (category) {
    CategoryFactory.createCategory(category)
    .then(function (category){
      $state.go('categoryadmin');
    })
  }

});
