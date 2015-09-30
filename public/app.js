angular.module('reactionTest', ['ngAnimate', 'app.routes', 'mainCtrl', 'userForm', 'formCtrl', 'gameCtrl', 'gameWidget', 'profileCtrl', 'scoresCtrl'])

// configuration to integrate token into requests
.config(['$httpProvider', function($httpProvider) {

        // attach auth interceptor to http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);