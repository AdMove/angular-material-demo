(function () {
    angular
        .module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$rootScope', '$cookies', 'NavigationService'];
    function AuthService($rootScope, $cookies, ns) {
        var service = {};

        service.login = login;
        service.logout = logout;
        service.isLoggedIn = isLoggedIn;

        return service;

        function login(provider, id_token) {
            var logins = {};
            logins[provider] = id_token;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:dc8ac281-9b58-4846-ad05-862c2f5c59d8',
                Logins: logins
            });

            AWS.config.credentials.get(function (err) {
                if (err) return console.log("Error", err);
                console.log("Cognito Identity Id", AWS.config.credentials.identityId);
                $cookies.put('auth_provider', provider);
                $cookies.put('auth_token', id_token);
                $cookies.put('aws_token', AWS.config.credentials.identityId);
                var user = gapi.auth2.getAuthInstance().currentUser.hg.wc;
                $cookies.put('user.email', user.hg);
                $cookies.put('user.name', user.wc);
                $cookies.put('user.photo', user.Ph);
                $rootScope.$apply(function () {
                    ns.goHome();
                });
            });
        }

        function logout() {
            if ($cookies.get('auth_provider') === 'accounts.google.com') {
                gapi.auth2.getAuthInstance().signOut().then(function () {
                    $cookies.remove('authProvider');
                    $rootScope.$apply(ns.goLogin);
                });
            }
        }

        function isLoggedIn(){
            // var provider = $cookies.get('auth_provider');
            // var token = $cookies.get('auth_token');
            // if (provider && token && provider === 'accounts.google.com'){
            //     return gapi.auth2.getAuthInstance().isSignedIn.hg;
            // }
            return false;
        }

    }
})();