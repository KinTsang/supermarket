'use strict'


app.factory('CartFactory', function($http){
  var obj = {};

  obj.addToCart = function(itemInfo){
    return $http.post('api/carts/', itemInfo);
  }

  return obj;
})
