app.config(function ($stateProvider){
  $stateProvider.state('categoryadmin', {
    url: '/admin/category',
    templateUrl: 'js/category/category_admin.html',
    // controller: 'AdminCategoryCtrl'
  })
  .state('editcategory', {
    url: '/admin/category/edit',
    templateUrl: 'js/category/category_admin_edit.html'
  })
});


app.controller('AdminCategoryCtrl', function ($scope, CategoryFactory, $log, $stateParams, $state){

  // CategoryFactory.fetchCatById($stateParams.categoryId)
  //   .then(function (foundCategory) {
  //     console.log(foundCategory);
  //     $scope.category = foundCategory;
  //   })
  //   .catch($log.error);

  $scope.editCategory = function (id, category){
    console.log('in edit category');
    CategoryFactory.editCategory(id, category)
    .then(category => $state.go('categoryadmin'));
  };

  $scope.deleteCategory = function (id) {
    console.log('in deleteCategory')
    CategoryFactory.deleteCategory(id)
    .then(function () {
      $state.go('categoryadmin');
    })
  };
});
