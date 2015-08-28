angular.module('scoresCtrl', ['userService'])

.controller('scoresController', ['User', function(User) {
        var vm = this;
        // get all users
        User.all().success(function(data) {
            vm.users = data;
        });

        vm.predicate = 'name';
        vm.reverse = true;
        vm.order = function(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }
    }]);