'use strict';

app.config(function($stateProvider){

  $stateProvider.state('orderHistory', {
    url: '/orders',
    templateUrl: 'js/orderHistory/orderHistory.html',
    controller: 'orderHistoryCtrl',
    resolve: {
      priorOrders: function($http){
        return $http.get('/api/orders')
        .then((priorOrders) => {
          return priorOrders.data
        })
      }
    }
  })
})

app.controller('orderHistoryCtrl', function($scope, priorOrders, orderHistoryFactory){
  $scope.priorOrders = priorOrders;
  // $scope.priorOrders = [].concat.apply([], $scope.priorOrders);

  $scope.getOrderDetail = function(orderNumber){
    orderHistoryFactory.getOrderDetail(orderNumber)
    .then((orderDetail) => {
      $scope.orderDetail = orderDetail.data
    })
  }
});

app.factory('orderHistoryFactory', function($http){
  return {
    getOrderDetail: function(orderNumber){
      return $http.get('/api/orders/?OrderId=' + orderNumber)
    }
  }
})
