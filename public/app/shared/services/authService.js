angular.module('authService', [])

// ===================
// factory for handling tokens
// inject $window to store token client side
// ===================
.factory('AuthToken', ['$window', function AuthTokenFactory($window) {
        var authTokenFactory = {};

        // get the token out of local storage
        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        // function to set or clear token
        // if a token is passed, set token
        // if there is no token, clear it from local storage
        authTokenFactory.setToken = function(token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

        return authTokenFactory;
    }])


// ====================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ====================
.factory('Auth', ['$http', '$q', 'AuthToken', function AuthFactory($http, $q, AuthToken) {
        var authFactory = {};

        // log a user in
        authFactory.login = function(username, password) {
            return $http.post('/api/authenticate', {
                username: username,
                password: password
            })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        // log a user out by clearing token
        authFactory.logout = function() {
            // clear token
            AuthToken.setToken();
        };

        // checks if there is a local token to verify user is logged in
        authFactory.isLoggedIn = function() {
            if (AuthToken.getToken())
                return true;
            else
                return false;
        };

        // get the logged in user
        authFactory.getUser = function() {
            if (AuthToken.getToken())
                return $http.get('/api/me', {cache: true});
            else
                return $q.reject({message: 'User has no token'});
        };

        return authFactory;
    }])

