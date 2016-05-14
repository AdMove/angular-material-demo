(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location'];
    function LoginController($scope, $location) {
        $scope.goRegister = function(){
            $location.path('/register');
        }
    }

})();