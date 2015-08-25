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
.controller('loginController', ['$location', 'Auth', function($location, Auth) {
        var vm = this;
        vm.type = 'login';
        vm.submitInfo = function() {
            // to show loading
            vm.processing = true;

            // clear error
            vm.error = '';

            // call login from Auth service
            Auth.login(vm.userData.username, vm.userData.password)
                .success(function(data) {
                    vm.processing = false;

                    if (data.success)
                        $location.path('/user');
                    else
                        vm.error = data.message;
                });
        };
    }])