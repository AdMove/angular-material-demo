(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$location'];
    function RegisterController($scope, $location) {
        $scope.goLogin = function() {
            $location.path('/login');
        }
    }

})();