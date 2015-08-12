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
    }]);