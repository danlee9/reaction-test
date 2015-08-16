angular.module('app.routes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/home.html'
            })
            .when('/signup', {
                templateUrl: 'app/components/form/signup.html',
                controller: 'signupController',
                controllerAs: 'user'
            })
            .when('/login', {
                templateUrl: 'app/components/form/login.html',
                controller: 'loginController',
                controllerAs: 'user'
            })
            .when('/guest', {
                templateUrl: 'app/components/game/guest.html',
                controller: 'guestController',
                controllerAs: 'guest'
            })
    }]);