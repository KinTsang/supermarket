'use strict';

app.config(function($stateProvider) {

    //state to for admin to manage all powers
    $stateProvider.state('viewCart', {
        url: '/cart/',
        templateUrl: 'js/cart/cart.html',
        controller: 'ViewCartCtrl',
        resolve: {
            cartInfo: CartFactory => CartFactory.fetchAll()
        }
    });

});

app.controller('ViewCartCtrl', function($scope, cartInfo, CartFactory) {
    $scope.cartInfo = cartInfo;
    $scope.removeFromCart = function(powerId) {
        CartFactory.removeFromCart(powerId)
        .then(() => {
            let powerIdx = $scope.cartInfo.findIndex((elem, idx) => {
                return elem.powerId === powerId;
            });
            $scope.cartInfo.splice(powerIdx, 1);
        })
    };
    $scope.clearCart = function() {
        Promise.all($scope.cartInfo.map((elem) => {
            return $scope.removeFromCart(elem.powerId);
        }))
        .then(() => {
            $scope.cartInfo = [];
        });
    };
});
