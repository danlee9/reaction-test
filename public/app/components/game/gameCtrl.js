angular.module('gameCtrl', [])

.controller('guestController', function() {
        var vm = this;
        vm.checkScore = function(score) {
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
        vm.testing = function(word) {
            console.log(word)
        }
    })