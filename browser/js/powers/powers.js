'use strict'

app.config(function($stateProvider) {

    // State for powers list in a specified category
    $stateProvider.state('powers', {
        url: '/powers',
        templateUrl: 'js/powers/powers.html',
        controller: 'PowersCtrl',
        //RESOLVE
    });

});


// Controller for powers list in a specified category
app.controller('PowersCtrl', function($scope, PowerFactory, $log, $stateParams) {

    PowerFactory.fetchAll($stateParams.categoryId)
        .then(function(foundPowers) {
            $scope.powers = foundPowers;
        })
        .catch($log.error);

    PowerFactory.fetchCatById($stateParams.categoryId)
        .then(function(foundCategory) {
            $scope.category = foundCategory;
        })
        .catch($log.error);
});
