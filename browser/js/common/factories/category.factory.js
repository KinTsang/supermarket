app.factory('CategoryFactory', function ($http) {
  let CategoryFactory = {};

  let formatData = (res) => res.data;

  CategoryFactory.fetchAll = function () {
    return $http.get('/api/categories')
      .then(formatData);
  }

  CategoryFactory.fetchCatById = function (id) {
    if (id === 'all'){
      return {name: 'All'};
    } else {
      return $http.get('/api/categories/' + id)
        .then(formatData);
    }
  }

  CategoryFactory.fetchItemsById = function (id) {

    if (id === 'all') {
      return $http.get('/api/categories/all')
        .then(formatData);
    } else {
      return $http.get('/api/categories/' + id + '/items')
        .then(formatData);
    }

   }

   CategoryFactory.createCategory = function (name) {
     return $http.post('/api/categories', {name: name})
      .then(formatData);
   }

   CategoryFactory.editCategory = function (id, name) {
     return $http.put('/api/categories/' + id, {name: name})
      .then(formatData);
   }

   CategoryFactory.deleteCategory = function (id) {
    return $http.delete('/api/categories' + id)
   }

  return CategoryFactory;
})
