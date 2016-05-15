(function () {
    'use strict';

    angular
        .module('app')
        .factory('NavigationService', NavigationService);

    NavigationService.$inject = ['$location'];
    function NavigationService($location) {
        var service = {};

        service.goLogin = function () {
            $location.path('/');
        };

        service.goRegister = function () {
            $location.path('/register');
        };

        service.goHome = function () {
            $location.path('/home');
        };

        return service;
    }
})();