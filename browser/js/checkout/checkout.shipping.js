'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('checkoutshipping', {
        url: '/checkout/shipping',
        templateUrl: 'js/checkout/checkout.shipping.html',
        params: {
            addrInfo: undefined
        },
        resolve: {
            user: (AuthService) => AuthService.getLoggedInUser(false)
        },
        controller: 'CheckoutShippingCtrl'
    });
});

app.controller('CheckoutShippingCtrl', function ($scope, $log, $state, CartFactory, user)  {
    $scope.form = {};

    if ($state.params && $state.params.addrInfo) {
        $scope.form.firstName = $state.params.addrInfo.firstName || undefined;
        $scope.form.lastName = $state.params.addrInfo.lastName || undefined;
        $scope.form.street = $state.params.addrInfo.street || undefined;
        $scope.form.city = $state.params.addrInfo.city || undefined;
        $scope.form.state = $state.params.addrInfo.state || undefined;
        $scope.form.zipcode = $state.params.addrInfo.zipcode || undefined;
    } else if (user) {
        $scope.form.firstName = user.firstName || undefined;
        $scope.form.lastName = user.lastName || undefined;
        $scope.form.street = user.street || undefined;
        $scope.form.city = user.city || undefined;
        $scope.form.state = user.state || undefined;
        $scope.form.zipcode = user.zipcode || undefined;
    }

    $scope.submitShipping = function() {
        let addrInfo = {};
        addrInfo.firstName = $scope.form.firstName || undefined;
        addrInfo.lastName = $scope.form.lastName || undefined;
        addrInfo.street = $scope.form.street || undefined;
        addrInfo.city = $scope.form.city || undefined;
        addrInfo.state = $scope.form.state || undefined;
        addrInfo.zipcode = $scope.form.zipcode || undefined;
        $state.go('checkoutreview', { addrInfo: addrInfo });
    }
});