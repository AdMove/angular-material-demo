(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$location', 'NavigationService', 'AuthService'];
    function RegisterController($scope, $location, ns, as) {
        $scope.goLogin = ns.goLogin;

        $scope.$on('$viewContentLoaded', function(){
            console.log('loaded');
            // if (as.isLoggedIn()){
            //     ns.goHome();
            // }
        });
    }

})();