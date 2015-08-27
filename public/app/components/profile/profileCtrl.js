angular.module('profileCtrl', ['authService', 'userService'])

.controller('profileController', ['AuthToken', 'User', function(AuthToken, User) {
        var vm = this;
        var id = AuthToken.getId();

        User.get(id).success(function(data) {
            vm.user = data;
        });
    }]);