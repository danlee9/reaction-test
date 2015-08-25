angular.module('gameCtrl', ['authService', 'userService'])

.controller('guestController', function() {
        var vm = this;

        // use session storage to store high scores during a session
        vm.checkScore = function(score) {
            if (score === null) return;
            if (sessionStorage.getItem('bestScore') === null) {
                // if there is no high score
                sessionStorage.setItem('bestScore', score);
            } else {
                if (score < sessionStorage.getItem('bestScore')) {
                    sessionStorage.setItem('bestScore', score);
                }
            }
            return sessionStorage.getItem('bestScore');
        };
    })

.controller('userController', ['AuthToken', 'User', function(AuthToken, User) {
        var vm = this;

        // grab id
        var id = AuthToken.getId();
        console.log(id);

        // set game mode
        // can be changed from game mod directive
        vm.mode = 'A';

        vm.checkScore = function(score) {
            if (vm.mode == 'A')
                console.log(score + 'A');
            else
                console.log(score + 'B');
        };
    }]);