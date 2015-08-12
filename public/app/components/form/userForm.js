angular.module('userForm', [])

.directive('userForm', function() {
        return {
            restrict: 'E',
            transclude: 'true',
            templateUrl: 'app/components/form/user-form.html'
        };
    });