(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$cookies', 'NavigationService', 'AuthService'];
    function LoginController($scope, $cookies, ns, as) {
        $scope.goRegister = ns.goRegister;

        $scope.$on('$viewContentLoaded', function () {
            console.log('loaded view');
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
                    ns.goHome();
                });
            }

            // if (as.isLoggedIn()){
            //     ns.goHome();
            // }
        });

        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            console.log('google signed in');
            console.log(authResult);
            console.log(event);
            var id_token = authResult.hg.id_token;
            console.log(id_token);
            as.login('accounts.google.com', id_token);
            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            //     IdentityPoolId: 'us-east-1:dc8ac281-9b58-4846-ad05-862c2f5c59d8',
            //     Logins: {'accounts.google.com': id_token}
            // });
            //
            // AWS.config.credentials.get(function (err) {
            //     if (err) return console.log("Error", err);
            //     console.log("Cognito Identity Id", AWS.config.credentials.identityId);
            //     // $rootScope.logout = function () {
            //     //     console.log('on log out');
            //     //     gapi.auth2.getAuthInstance().auth2.signOut().then(function () {
            //     //         console.log('google signed out.');
            //     //
            //     //     });
            //     // };
            //     ns.goHome();
            // });
        });

        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // User has not authorized the G+ App!
            console.log('Not signed into Google Plus.');
            console.log(authResult);
        });
    }

})();