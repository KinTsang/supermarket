'use strict';

app.config(function($stateProvider){

  $stateProvider.state('orderHistory', {
    url: '/users/orders',
    templateUrl: 'js/orderHistory/orderHistory.html',
    controller: 'orderHistoryCtrl',
    // resolve: {
    //   priorOrders: function($http){
    //     return $http.get('/api/users/orders')
    //     .then((priorOrders) => {
    //       return priorOrders.data
    //     })
      // }
    // }
  })
})

app.controller('orderHistoryCtrl', function($scope, orderHistoryFactory){
  //$scope.priorOrders = priorOrders;
  $scope.showOrderDetail = false;

  $scope.getOrderDetail = function(orderNumber){
    orderHistoryFactory.getOrderDetail(orderNumber)
    .then((orderDetail) => {
      $scope.orderDetail = orderDetail.data
      $scope.showOrderDetail = true;
    })

    $scope.toggleShowOrderDetail = function(){
      $scope.showOrderDetail = false;
    }
  }
});

app.factory('orderHistoryFactory', function($http){
  return {
    getOrderDetail: function(orderNumber){
      return $http.get('/api/users/orders/?OrderId=' + orderNumber)
    }
  }
})
