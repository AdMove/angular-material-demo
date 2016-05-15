(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages', 'ngRoute'])
        .directive('mapCanvas', mapCanvasDirective)
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'templates/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'templates/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'templates/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({redirectTo: '/login'});
    }

    function mapCanvasDirective() {
        return {
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            link: function (scope, element) {
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(-34.397, 150.644)
                };
                new google.maps.Map(element[0], mapOptions);
            }
        };
    }

})();