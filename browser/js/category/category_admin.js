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
    // resolve: {
    //   currentCategory: function(CategoryFactory, $stateParams){
    //     CategoryFactory.fetchById($stateParams.categoryId)

    //   }
    // }
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
    console.log(foundCategories);
    $scope.categories = foundCategories;
  })

  $scope.editCategory = function (categoryId, category){
    console.log('id', category);
    CategoryFactory.editCategory(categoryId, category)
    .then(category => $state.go('categoryadmin'));
  };


  $scope.deleteCategory = function (id) {
    return CategoryFactory.deleteCategory(id)
    .then(function () {
      $state.reload();
    })
  };

  $scope.isActive = function (categoryId, status){
    console.log('in isActive')
    CategoryFactory.editStatus(categoryId, status)
    .then(category => $state.go('categoryadmin'));
  };
  $scope.categoryForm = false;

  $scope.showForm = function () {
    $scope.categoryForm = !$scope.categoryForm;
  }
  $scope.addCategory = function (category) {
    CategoryFactory.createCategory(category)
    .then(function (category){
      $state.go('categoryadmin');
    })
  }

  // $scope.statuses = [
  //   {value: 1, text: 'status1'},
  //   {value: 2, text: 'status2'}
  // ];

  // $scope.showStatus = function() {
  //   var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
  //   return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
  // }

});
