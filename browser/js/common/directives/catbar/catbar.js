app.directive('catbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/catbar/catbar.html',
    link: function (scope) {
      scope.categories = ['cat1', 'cat2', 'cat3']
    }
  }
})
