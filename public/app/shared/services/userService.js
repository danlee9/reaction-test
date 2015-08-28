angular.module('userService', [])

.factory('User', ['$http', function UserFactory($http) {
        // create new object
        var userFactory = {};

        // get a single user
        userFactory.get = function(id) {
            return $http.get('/api/users/' + id, {cache: true});
        };

        // get all users
        userFactory.all = function() {
            return $http.get('/api/users', {cache: true});
        };

        // create a user
        userFactory.create = function(userData) {
            return $http.post('/api/users', userData);
        };

        // update a user
        userFactory.update = function(id, userData) {
            return $http.put('/api/users/' + id, userData);
        };

        // delete a user
        userFactory.delete = function(id) {
            return $http.delete('/api/users/' + id);
        };

        // return object
        return userFactory;
    }]);