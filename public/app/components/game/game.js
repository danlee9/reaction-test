angular.module('gameWidget', [])

.directive('gameArea', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/game/game-area.html',
            transclude: true,
            scope: {
                score: '&'
            },
            controller: ['$scope', function($scope) {
                var vm = this;
                vm.hidden = true;
                vm.gameOver = false;

                var timer;
                var createdTime;
                var clickedTime;
                vm.reactionTime = 0;
                vm.count = 0;
                vm.totalTime = 0;

                // get box div
                var box = $('#box');

                // random color generator
                function randomColor() {
                    var hexadecimal = '0123456789ABCDEF'.split('');
                    var color = '#';
                    var index;
                    for (var i=0; i<6; i++) {
                        index = Math.round(Math.random() * 15);
                        color += hexadecimal[index];
                    }
                    return color;
                }

                // box generator
                vm.makeBox = function() {
                    vm.gameOver = false;
                    // horizontal position, vertical position, box color
                    var horizontal = (Math.random() * 90) + '%';
                    var vertical = (Math.random() * 90) + '%';
                    var color = randomColor();
                    // set styles
                    box.css({left: horizontal, top: vertical, 'background-color': color});

                    var shape = Math.random();
                    if (shape<0.5)
                        box.css('border-radius', '50%');
                    else
                        box.css('border-radius', '0');

                    // set random timer to show
                    var random = Math.random() * 5000; // max of 5 seconds
                    timer = $timeout(function() {
                        vm.hidden = false;
                        createdTime = Date.now();
                    }, random)
                };

                vm.boxClick = function() {
                    clickedTime = Date.now();
                    vm.reactionTime = (clickedTime-createdTime)/1000;
                    vm.totalTime += vm.reactionTime;
                    vm.hidden = true;
                    vm.count++;
                    if (vm.count < 20) {
                        vm.makeBox();
                    } else {
                        vm.finalScore = vm.totalTime;
                        vm.bestScore = $scope.score({score: vm.finalScore});
                        vm.gameOver = true;
                        vm.count = 0;
                        vm.totalTime = 0;
                        vm.reactionTime = 0;
                    }
                };

                vm.reset = function() {
                    vm.count = 0;
                    vm.totalTime = 0;
                    vm.reactionTime = 0;
                    $timeout.cancel(timer);
                };
            }],
            controllerAs: 'game'
        };
    }])