app.factory('CategoryFactory', function($http) {
    let CategoryFactory = {};

    let formatData = (res) => res.data;

    CategoryFactory.fetchAll = function() {
        return $http.get('/api/categories/')
            .then(formatData);
    }

    CategoryFactory.fetchById = function(id) {
        return $http.get('/api/categories/' + id)
            .then(formatData);
    }

    CategoryFactory.create = function(name) {
        return $http.post('/api/categories', { name: name })
            .then(formatData);
    }

    CategoryFactory.editName = function(id, name) {
        return $http.put('/api/categories/' + id, { name: name })
            .then(formatData);
    }

    CategoryFactory.editStatus = function(id, boolean) {
        return $http.put('/api/categories/' + id, { active: boolean })
            .then(formatData);
    }

    // CategoryFactory.delete = function(id) {
    //     return $http.delete('/api/categories/' + id)
    // }

    return CategoryFactory;
})
