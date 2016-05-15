(function () {
    angular
        .module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$rootScope', '$cookies', 'NavigationService'];
    function AuthService($rootScope, $cookies, ns) {
        var service = {};

        service.login = login;
        service.logout = logout;

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
                $cookies.put('auth_provider', provider);
                $cookies.put('auth_token', id_token);
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
                $cookies.remove('auth_provider');
                $cookies.remove('auth_token');
                $cookies.remove('user.email');
                $cookies.remove('user.name');
                $cookies.remove('user.photo');
                ns.goLogin();
            }
        }

    }
})();