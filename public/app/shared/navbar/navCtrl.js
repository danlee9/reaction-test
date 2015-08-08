angular.module('navCtrl', [])

.controller('navController', ['$rootScope', '$location', function($rootScope, $location) {
        var vm = this;
        vm.loggedIn = true;
        vm.user = {};
        vm.user.name = "CoolGuy";
    }]);