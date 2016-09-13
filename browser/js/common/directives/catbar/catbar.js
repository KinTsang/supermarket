app.directive('catbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/catbar/catbar.html',
    link: function (scope) {
      scope.categories = ['Category 1', 'Category 2', 'Category 3']
    }
  }
})
