(function () {
        'use strict';

        angular
            .module('app')
            .controller('HomeController', HomeController)
            .controller('LeftCtrl', LeftCtrl)
            .controller('RightCtrl', RightCtrl);

        HomeController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$cookies', 'AuthService', 'NavigationService'];
        function HomeController($scope, $timeout, $mdSidenav, $log, $cookies, as, ns) {
            $scope.$on('$viewContentLoaded', function () {
                var provider = $cookies.get('auth_provider');
                var token = $cookies.get('auth_token');
                if (provider && token) {
                    var logins = {};
                    logins[provider] = token;
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:dc8ac281-9b58-4846-ad05-862c2f5c59d8',
                        Logins: logins
                    });
                    AWS.config.credentials.get(function (err) {
                        if (err) {
                            $scope.$apply(function () {
                                ns.goLogin();
                            });
                            return console.log("Error", err);
                        }
                    });
                } else {
                    ns.goLogin();
                }
            });
            $scope.user = {
                photo: $cookies.get('user.photo'),
                name: $cookies.get('user.name'),
                email: $cookies.get('user.email')
            };

            $scope.isOpen = false;


            $scope.user = {
                photo: $cookies.get('user.photo'),
                name: $cookies.get('user.name'),
                email: $cookies.get('user.email')
            };

            $scope.isOpen = false;

            $scope.logout = as.logout;

            $scope.navigationBar = {
                isOpen: false,
                count: 0,
                selectedDirection: 'left'
            };

            $scope.toggleLeft = buildDelayedToggler('left');
            $scope.toggleRight = buildToggler('right');
            $scope.isOpenRight = function () {
                return $mdSidenav('right').isOpen();
            };

            /**
             * Supplies a function that will continue to operate until the
             * time is up.
             */
            function debounce(func, wait, context) {
                var timer;
                return function debounced() {
                    var context = $scope,
                        args = Array.prototype.slice.call(arguments);
                    $timeout.cancel(timer);
                    timer = $timeout(function () {
                        timer = undefined;
                        func.apply(context, args);
                    }, wait || 10);
                };
            }

            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildDelayedToggler(navID) {
                return debounce(function () {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                }, 200);
            }

            function buildToggler(navID) {
                return function () {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                }
            }
        }

        LeftCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];
        function LeftCtrl($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function () {
                $mdSidenav('left').close()
                    .then(function () {
                        $log.debug("close LEFT is done");
                    });
            };
        }

        RightCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];
        function RightCtrl($scope, $timeout, $mdSidenav, $log) {

            $scope.filter = function () {
                console.log($scope.startDate);
                console.log($scope.endDate);
            };


            $scope.close = function () {
                $mdSidenav('right').close()
                    .then(function () {
                        $log.debug("close RIGHT is done");
                    });
            };
        }

    })();