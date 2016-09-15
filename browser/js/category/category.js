'use strict'

app.config(function($stateProvider) {

    // State for ALL powers
    $stateProvider.state('allCategory', {
        url: '/category/all',
        templateUrl: 'js/category/category.html',
        controller: 'AllCatCtrl',
    });
    // State for powers list in a specified category
    $stateProvider.state('category', {
        url: '/category/:categoryId',
        templateUrl: 'js/category/category.html',
        controller: 'CategoryCtrl',
    });

});


// Controller for powers list in a specified category
app.controller('CategoryCtrl', function($scope, CategoryFactory, $log, $stateParams) {

    CategoryFactory.fetchPowersById($stateParams.categoryId)
        .then(function(foundPowers) {
            $scope.powers = foundPowers;
        })
        .catch($log.error);

    CategoryFactory.fetchCatById($stateParams.categoryId)
        .then(function(foundCategory) {
            $scope.category = foundCategory;
        })
        .catch($log.error);
});


// Controller for list of ALL powers
app.controller('AllCatCtrl', function($scope, CategoryFactory, $log, $stateParams) {

    CategoryFactory.fetchAllPowers()
        .then(function(foundPowers) {
            $scope.powers = foundPowers;
        })
        .catch($log.error);
});
