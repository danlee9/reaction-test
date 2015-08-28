angular.module('gameCtrl', ['authService', 'userService'])

.controller('guestController', ['$q', function($q) {
        var vm = this;

        // use session storage to store high scores during a session
        vm.checkScore = function(score) {
            var deferred = $q.defer();
            if (!score) {
                deferred.resolve(null);
                return deferred.promise;
            }
            if (sessionStorage.getItem('bestScore') === null) {
                // if there is no high score
                sessionStorage.setItem('bestScore', score);
            } else {
                if (score < sessionStorage.getItem('bestScore')) {
                    sessionStorage.setItem('bestScore', score);
                }
            }
            deferred.resolve(sessionStorage.getItem('bestScore'));
            return deferred.promise;
        };
    }])

.controller('userController', ['$q', '$cacheFactory', 'AuthToken', 'User', function($q, $cacheFactory, AuthToken, User) {
        var vm = this;

        // grab id
        var id = AuthToken.getId();

        var cache = $cacheFactory.get('$http');


        // set game mode
        // can be changed from game mod directive
        vm.mode = 'A';

        vm.checkScore = function(score) {
            // score object to send in http request
            cache.remove('/api/users');
            cache.remove('/api/users' + id);

            var user;
            var deferred = $q.defer();
            User.get(id).success(function(data) {
                user = data;
                if (vm.mode == 'A') {
                    if (!score) {
                        if (!user.bestscoreA) return deferred.resolve(null);
                        deferred.resolve(user.bestscoreA);
                    } else {
                        if (!user.bestscoreA) {
                            user.bestscoreA = score;
                            User.update(id, user);
                            deferred.resolve(user.bestscoreA);
                        }
                        if (score < user.bestscoreA) {
                            user.bestscoreA = score;
                            User.update(id, user);
                            deferred.resolve(user.bestscoreA);
                        }
                    }
                } else {
                    if (!score) {
                        if (!user.bestscoreB) return deferred.resolve(null);
                        deferred.resolve(user.bestscoreB);
                    } else {
                        if (!user.bestscoreB) {
                            user.bestscoreB = score;
                            User.update(id, user);
                            deferred.resolve(user.bestscoreB);
                        }
                        if (score < user.bestscoreB) {
                            user.bestscoreB = score;
                            User.update(id, user);
                            deferred.resolve(user.bestscoreB);
                        }
                    }
                }
            });
            return deferred.promise;
        };
    }]);