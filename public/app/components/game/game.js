angular.module('gameWidget', [])

.directive('gameArea', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/game/game-area.html',
            transclude: true,
            scope: {
                score: '&', // function to update and display user's best score
                mode: '=' // checks for different game modes
            },
            controller: ['$scope', '$element', function($scope, $element) {
                var vm = this;
                vm.hidden = true; // hides box
                vm.gameOver = false;
                vm.interval = 3000; // interval between shape creation (3 seconds)

                var timer; // for reference to $timeout
                var createdTime; // time box is created
                var clickedTime; // time box is clicked on
                vm.reactionTime = 0; // time it takes to click on box from when it appears
                vm.count = 0; // amount of clicks
                vm.totalTime = 0; // cumulative reaction time

                // adds best score to stats
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
                var overlay = $element.find('.overlay');
                var gameSpace = $element.find('.game-space');

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

                        vm.hidden = false; // show box or circle
                        createdTime = Date.now();
                    }, random)
                };

                vm.boxClick = function() {
                    vm.hidden = true;
                    clickedTime = Date.now();
                    vm.reactionTime = (clickedTime-createdTime)/1000;
                    vm.totalTime += vm.reactionTime;
                    vm.count++;
                    if (vm.count < 10) {
                        vm.makeBox();
                    } else {
                        vm.finalScore = vm.totalTime;
                        $scope.score({score: vm.finalScore}).then(function(response) {
                            vm.bestScore = response;
                        });
                        vm.gameOver = true;
                        var areaHeight = gameSpace.height();
                        var areaWidth = gameSpace.width();
                        $timeout(function() {
                            var overlayHeight = overlay.height();
                            var overlayWidth = overlay.width();
                            var left = (1 - overlayWidth/areaWidth)/2 * 100;
                            var top = (1 - overlayHeight/areaHeight)/2 * 100;
                            // center overlay
                            overlay.css({left: left + '%', top: top + '%'});
                        }, 100);                                               
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