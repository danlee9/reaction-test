angular.module('app.routes', ['ngRoute', 'authService'])

.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/home.html',
                resolve: {
                    login: ['$location', 'Auth', function($location, Auth) {
                        if (Auth.isLoggedIn()) {
                            $location.path('/user');
                        }
                    }]
                }
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
            .when('/user', {
                templateUrl: 'app/components/game/user.html',
                controller: 'userController',
                controllerAs: 'user'
            })
            .when('/profile', {
                templateUrl: 'app/components/profile/profile.html',
                controller: 'profileController',
                controllerAs: 'profile'
            })
            .when('/scores', {
                templateUrl: 'app/components/scores/scores.html',
                controller: 'scoresController',
                controllerAs: 'scores'
            });
    }]);