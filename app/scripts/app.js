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
                var poly;
                var map;

                map = new google.maps.Map(element[0], {
                    zoom: 13,
                    center: new google.maps.LatLng(41.7166, 44.7833)
                });

                poly = new google.maps.Polyline({
                    strokeColor: '#000000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                });
                poly.setMap(map);

                // Add a listener for the click event
                map.addListener('click', addLatLng);

                // Handles click events on a map, and adds a new point to the Polyline.
                function addLatLng(event) {
                    var path = poly.getPath();

                    // Because path is an MVCArray, we can simply append a new coordinate
                    // and it will automatically appear.
                    path.push(event.latLng);
                    
                }
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