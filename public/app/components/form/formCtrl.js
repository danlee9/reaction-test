angular.module('formCtrl', [])

.controller('signupController', function() {
        var vm = this;
        vm.type = 'signup';
        vm.submitInfo = function() {
            alert('It works');
        };
    });