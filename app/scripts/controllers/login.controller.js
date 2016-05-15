(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$cookies', 'NavigationService', 'AuthService'];
    function LoginController($scope, $cookies, ns, as) {
        $scope.goRegister = ns.goRegister;

        $scope.$on('$viewContentLoaded', function () {
            var provider = $cookies.get('auth_provider');
            var token = $cookies.get('auth_token');
            if (provider && token) {
                var logins = {};
                logins[provider] = token;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:dc8ac281-9b58-4846-ad05-862c2f5c59d8',
                    Logins: logins
                });
                AWS.config.credentials.get(function (err) {
                    if (err) {
                        return console.log("Error", err);
                    }
                    $scope.$apply(function () {
                        ns.goHome();
                    });
                });
            }
        });

        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            var id_token = authResult.hg.id_token;
            as.login('accounts.google.com', id_token);
        });

    }

})();