(function () {
    'use strict';

    angular
        .module('app', ['ngMaterial', 'ngMessages', 'ngRoute'])
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

})();