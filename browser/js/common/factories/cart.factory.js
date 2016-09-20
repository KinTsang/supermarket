'use strict'


app.factory('CartFactory', function($http) {
    let CartFactory = {};

    let formatData = (res) => res.data;

    CartFactory.addToCart = function(powerId, quantity){
        return $http.post('/api/carts/' + powerId, { quantity: quantity });
    };

    CartFactory.fetchAll = function() {
        return $http.get('/api/carts/')
            .then(formatData);
    };

    CartFactory.removeFromCart = function(powerId) {
        return $http.delete('/api/carts/' + powerId)
            .then(formatData);
    };

    CartFactory.completeCheckout = function (obj) {
        return $http.put('/api/carts/checkout')
            .then(formatData);
    }
    return CartFactory;
});
