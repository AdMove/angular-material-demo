(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCookies', 'directive.gsignin'])
        .directive('mapCanvas', mapCanvasDirective)
        .config(config)
        .run(run);

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
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'templates/home.view.html',
                controllerAs: 'vm'
            })

            .when('/', {
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

    run.$inject = ['$window'];
    function run($window) {

        $window.fbAsyncInit = function () {
            FB.init({
                appId: '181154708936062',
                status: true,
                cookie: true,
                xfbml: true
            });
        };

        (function (d) {
            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));
    }

})();