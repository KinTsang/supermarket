app.factory('UserFactory', function ($http) {

  let UserFactory = {};
  const route = '/api/users/';
  let formatData = (res) => res.data;

  UserFactory.fetchById = function (id) {
    return $http.get(route + id)
     .then(formatData);
  }

  UserFactory.editUser = function (id, data) {
    console.log(id, data);
    return $http.put(route + id, data)
      .then(formatData)
  }

  return UserFactory;
});
