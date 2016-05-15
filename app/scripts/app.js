(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCookies', 'directive.g+signin'])
        .directive('mapCanvas', mapCanvasDirective)
        .config(config);

    function mapCanvasDirective() {
        return {
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            link: function (scope, element) {
                new google.maps.Map(element[0], {
                    zoom: 13,
                    center: new google.maps.LatLng(41.7166, 44.7833)
                });
            }
        };
    }

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

})();