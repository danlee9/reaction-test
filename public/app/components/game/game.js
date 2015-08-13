angular.module('game', [])

.directive('gameArea', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/game/game-area.html'
        }
    })