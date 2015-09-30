angular.module('homeCtrl', ['authService'])

.controller('homeController', ['$location', 'Auth', function($location, Auth) {
	if (Auth.isLoggedIn()) {
		$location.path('/user');
	}
}]);