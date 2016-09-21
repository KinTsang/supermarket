app.factory('AuthFactory', function ($http, $log) {

  var AuthFactory = {};

  AuthFactory.createUser = function(data){
    return $http.post('/api/users', data)
    .then(function(res){
      console.log(res.data);
      return res.data;
    })
    .catch($log.error);
  };


  return AuthFactory;
});
