(function () {
    'use strict';

    angular
        .module('app')
        .factory('MapService', MapService);

    MapService.$inject = [];
    function MapService() {
        var service = {};

        service.getPoints = function () {
           
        };

        return service;
    }
})();