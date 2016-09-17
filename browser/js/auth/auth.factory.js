'use strict';

app.factory('AuthFactory', function ($http, $log) {

  var AuthFactory = {};

  AuthFactory.fetchUser = function(form){
    return $http.post('/login', form)
    .then(function(res){
      return res.data;
    });
  };
  AuthFactory.createUser = function(data){
    return $http.post('/api/users', data)
    .then(function(res){
      console.log(res.data);
      return res.data;
    })
    .catch($log.error);
  };

  AuthFactory.logout = function(){
    console.log('in factory 1');
    return $http.get('/logout')
    .then(function(res){
      console.log('in factory');
      return res.data;
    });
  };

  return AuthFactory;
});


//TLEE: why do providers only appear after Auth factory is created???
