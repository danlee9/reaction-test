angular.module('mainCtrl', ['authService'])

.controller('mainController', ['$rootScope', '$location', '$cacheFactory', 'Auth', function($rootScope, $location, $cacheFactory, Auth) {
        var vm = this;

        // check if user is logged in
        vm.loggedIn = Auth.isLoggedIn();

        // get cache for http requests
        var cache = $cacheFactory.get('$http');

        // check to see if user is logged in on every request and page change
        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.isLoggedIn();

            // get user information
            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;
                });
        });

        // login thru login page with login controller

        // logout function
        vm.logout = function() {
            Auth.logout();

            // reset user info
            vm.user = {};

            // clear angular cache
            cache.removeAll();
            $location.path('/');
        }
    }]);