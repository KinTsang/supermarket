'use strict'

app.config(function($stateProvider) {

    // State for powers list in a specified category

    $stateProvider.state('powers', {
        url: '/powers?categoryId',
        templateUrl: 'js/powers/powers.html',
        controller: 'PowersCtrl',
        resolve: {
            powers: function(PowerFactory, $stateParams) {
                return PowerFactory.fetchAll($stateParams.categoryId);
            },
            category: function(CategoryFactory, $stateParams) {
                if ($stateParams.categoryId === 'all') return { name: 'All' };
                return CategoryFactory.fetchById($stateParams.categoryId);
            }
        }
    });

});


// Controller for powers list in a specified category
app.controller('PowersCtrl', function($scope, $log, $stateParams, powers, category) {
    $scope.powers = powers;
    $scope.category = category;
});
