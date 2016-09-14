app.factory('CategoryFactory', function($http) {
    let CategoryFactory = {};

    let formatData = (res) => res.data;

    CategoryFactory.fetchAll = function() {
        return $http.get('/api/categories/')
            .then(formatData);
    }

    CategoryFactory.fetchAllPowers = function() {
        return $http.get('/api/categories/all/powers')
            .then(formatData);
    }

    CategoryFactory.fetchCatById = function(id) {
        return $http.get('/api/categories/' + id)
            .then(formatData);
    }

    CategoryFactory.fetchPowersById = function(id) {
        return $http.get('/api/categories/' + id + '/powers')
            .then(formatData);
    }

    CategoryFactory.createCategory = function(name) {
        return $http.post('/api/categories', { name: name })
            .then(formatData);
    }

    CategoryFactory.editCategory = function(id, name) {
        return $http.put('/api/categories/' + id, { name: name })
            .then(formatData);
    }

    return CategoryFactory;
})
