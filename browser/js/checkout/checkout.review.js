'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('checkoutreview', {
        url: '/checkout/review',
        templateUrl: 'js/checkout/checkout.review.html',
        params: {
            addrInfo: undefined
        },
        resolve: {
            cartInfo: (CartFactory) => CartFactory.fetchAll()
        },
        controller: 'CheckoutReviewCtrl'
    });
});

app.controller('CheckoutReviewCtrl', function ($scope, $log, $state, CartFactory, cartInfo)  {
    $scope.cartInfo = cartInfo;
    $scope.addrInfo = $state.params.addrInfo;
    $scope.totalPrice = cartInfo.reduce((prev, elem) => prev + elem.price, 0);

    $scope.completeCheckout = function() {
        CartFactory.completeCheckout({
            addrInfo: $scope.addrInfo
        })
        .then(() => $state.go('home'))
        .catch($log.error());
    };
});