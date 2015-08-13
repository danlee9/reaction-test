angular.module('formCtrl', ['userService', 'authService'])

.controller('signupController', ['User', function(User) {
        var vm = this;
        vm.type = 'signup';
        vm.submitInfo = function() {
            User.create(vm.userData).success(function(data) {
                // clear form
                vm.userData = {};
                vm.message = data.message;
            })
        };
    }])
.controller('loginController', ['Auth', function(Auth) {
        var vm = this;
        vm.type = 'login';
    }])