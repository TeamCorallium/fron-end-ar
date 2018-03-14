app.controller('LoginCtrl', ["$scope", "RestService", "$state", "$rootScope", "$cookies", "growl", "$translate", "filterFilter",
    function($scope, RestService, $state, $rootScope, $cookies, growl, $translate, filterFilter) {

        $scope.administrator = false;
        $rootScope.notificationCount = 0;
        $rootScope.notifications = [];

        $scope.usernameHome = '';
        $scope.pwdHome = '';

        $('#usernameLogin').hide();

        if (RestService.getCookie('csrftoken') == null) {
            RestService.fetchObjectByUrl(RestService.loginNext)
                .then(
                    function(data) {
                        console.log('get get ' + RestService.getCookie('csrftoken'));
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );

        } else {
            console.log(RestService.getCookie('csrftoken'));
        }

        $scope.loginModal = function() {
            if ($scope.usernameHome != '') {
                $('#usernameLogin').hide();
                RestService.login($scope.usernameHome, $scope.pwdHome);
            } else {
                if ($scope.usernameHome == '') {
                    $('#usernameLogin').show();
                }
            }
        };

        $rootScope.$on('connected', function(event, data) {
            $('#errorBox').hide();
            $('#errorBoxHome').hide();
            $('#myModal').modal('hide');
            $('#myModalLoginHome').modal('hide');

            $scope.usernameHome = '';
            $scope.pwdHome = '';

            if ($cookies.get('username') === 'admin') {
                $scope.administrator = true;
                $state.go('admin');
            } else {
                $scope.administrator = false;
                $state.go('profile');
            }

        });

        $scope.logout = function() {
            $cookies.remove("sessionid", { path: '/' });
            $cookies.remove("username", { path: '/' });
            $rootScope.$broadcast('logout');
            $state.go('home');
        };

        $rootScope.$on('wrongLogin', function(event, data) {
            $('#errorBoxHome').show();
            $('#errorBox').show();
        });

        $rootScope.$on('forbidden', function(event, data) {
            if (RestService.getCookie('csrftoken') == null) {
                RestService.fetchObjectByUrl(RestService.loginNext)
                    .then(
                        function(data) {
                            console.log('get get ' + RestService.getCookie('csrftoken'));
                        },
                        function(errResponse) {
                            console.log(errResponse);
                        }
                    );

            } else {
                console.log(RestService.getCookie('csrftoken'));
            }

            var weProblem = $translate.instant('login.WE_PROBLEM');
            var login = $translate.instant('login.LOGIN');
            growl.error(weProblem, { title: login });
        });

        $rootScope.$on('LoginNetworkConnectionError', function(event, data) {
            var serverNotFound = $translate.instant('login.SERVER_NOT_FOUND');
            var networkConnection = $translate.instant('login.NETWORK_CONNECTION');
            growl.error(serverNotFound, { title: networkConnection });
        });

        $("#usernameHome").on('keyup', function(e) {
            if (e.keyCode == 13) {
                if ($scope.usernameHome != '') {
                    RestService.login($scope.usernameHome, $scope.pwdHome);
                }
            }
        });

        $("#pwdHome").on('keyup', function(e) {
            if (e.keyCode == 13) {
                var user = $('#usernameHome').val();
                var pass = $('#pwdHome').val();
                RestService.login(user, pass);
            }
        });

        $scope.raiseModalRegister = function() {
            $('#myModalLoginHome').modal('hide');
            $('#myModal').modal('hide');
            $('#myModalRegisterHome').modal('show');
        };
    }
]);