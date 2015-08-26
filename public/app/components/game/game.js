angular.module('gameWidget', [])

.directive('gameArea', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/game/game-area.html',
            transclude: true,
            scope: {
                score: '&',
                mode: '='
            },
            controller: ['$scope', '$element', function($scope, $element) {
                var vm = this;
                vm.hidden = true;
                vm.gameOver = false;
                vm.interval = 3000; // interval between shape creation (3 seconds)

                var timer;
                var createdTime;
                var clickedTime;
                vm.reactionTime = 0;
                vm.count = 0;
                vm.totalTime = 0;
                $scope.score().then(function(response) {
                    vm.bestScore = response;
                });

                $scope.$watch('mode', function(newVal, oldVal) {
                    $scope.score().then(function(response) {
                        vm.bestScore = response;
                    });
                }, true);

                // get box div
                var box = $element.find('.box');

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

                    // set random timer to show
                    var random = Math.random() * vm.interval; // max of 3 seconds
                    timer = $timeout(function() {
                        // set styles
                        box.css({left: horizontal, top: vertical, 'background-color': color});

                        // set shape
                        var shape = Math.random();
                        if (shape<0.5)
                            box.css('border-radius', '50%');
                        else
                            box.css('border-radius', '0');

                        vm.hidden = false;
                        createdTime = Date.now();
                    }, random)
                };

                vm.boxClick = function() {
                    vm.hidden = true;
                    clickedTime = Date.now();
                    vm.reactionTime = (clickedTime-createdTime)/1000;
                    vm.totalTime += vm.reactionTime;
                    vm.count++;
                    if (vm.count < 20) {
                        vm.makeBox();
                    } else {
                        vm.finalScore = vm.totalTime;
                        $scope.score({score: vm.finalScore}).then(function(response) {
                            vm.bestScore = response;
                        });
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
                    vm.hidden = true;
                };

                // cancel timer when DOM element is destroyed on route changes
                $scope.$on('$destroy', function(e) {
                    $timeout.cancel(timer);
                });
            }],
            controllerAs: 'game'
        };
    }])

.directive('gameMod', function() {
        return {
            require: 'gameArea',
            restrict: 'A',
            link: function(scope, element, attrs, gameAreaCtrl) {
                gameAreaCtrl.interval = 1000;
            }
        };
    });