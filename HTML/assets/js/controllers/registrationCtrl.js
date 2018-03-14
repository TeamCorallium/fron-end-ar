app.controller('RegistrationCtrl', ["$scope", "RestService", "$state", "$rootScope", "$cookies", "growl", "$translate",
    function($scope, RestService, $state, $rootScope, $cookies, growl, $translate) {

        $scope.errorMessage = '';

        $scope.email = '';
        $scope.username = '';
        $scope.password = '';
        $scope.passAgain = '';
        $scope.pin = '';

        $('#errorEmailEmptyBox').hide();
        $('#errorUsernameEmptyBox').hide();
        $('#errorPasswordMatch').hide();

        $('#errorEmailResgisterEmpty').hide();
        $('#errorUsernameResgisterEmpty').hide();
        $('#errorPasswordRegisterMatch').hide();

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

        $scope.registerModal = function() {
            $('#RegisterWrongUserPassword').hide();
            $('#RegisterWrongUserPasswordHome').hide();

            if ($scope.username != '' && $scope.password != '' && $scope.passAgain != '' && $scope.email != '' && $scope.pin != '') {
                if ($scope.password === $scope.passAgain) {
                    $('#errorEmailEmptyBox').hide();
                    $('#errorUsernameEmptyBox').hide();
                    $('#errorPasswordMatch').hide();
                    RestService.register($scope.username, $scope.password, $scope.email, $scope.pin);
                } else {
                    $('#errorPasswordMatch').show();
                }
            } else {
                // var emptyField = $translate.instant('register.EMPTY_FIELDS');
                // var register = $translate.instant('register.REGISTER');
                // growl.error(emptyField, {
                //     title: register
                // });

                if ($scope.email == '') {
                    $('#errorEmailEmptyBox').show();
                }
                if ($scope.username == '') {
                    $('#errorUsernameEmptyBox').show();
                }
            }
        };

        $scope.registerModalHome = function() {
            $('#RegisterWrongUserPassword').hide();
            $('#RegisterWrongUserPasswordHome').hide();

            if ($scope.username != '' && $scope.password != '' && $scope.passAgain != '' && $scope.email != '') {
                if ($scope.password === $scope.passAgain) {
                    $('#errorEmailResgisterEmpty').hide();
                    $('#errorUsernameResgisterEmpty').hide();
                    $('#errorPasswordRegisterMatch').hide();
                    RestService.register($scope.username, $scope.password, $scope.email);
                } else {
                    // var sorryTry = $translate.instant('register.SORRY_TRY');
                    // var wrongUserPass = $translate.instant('register.WRONG_USER_PASS');
                    // growl.error(sorryTry, {
                    //     title: wrongUserPass
                    // });
                    $('#errorPasswordRegisterMatch').show();
                }
            } else {
                // var emptyField = $translate.instant('register.EMPTY_FIELDS');
                // var register = $translate.instant('register.REGISTER');
                // growl.error(emptyField, {
                //     title: register
                // });

                if ($scope.username == '') {
                    $('#errorUsernameResgisterEmpty').show();
                }

                if ($scope.email == '') {
                    $('#errorEmailResgisterEmpty').show();
                }
            }
        };

        $rootScope.$on('register', function(event, data) {
            $('#myModal').modal('hide');
            $('#myModalRegisterHome').modal('hide');
            $('#RegisterWrongUserPassword').hide();
            $('#RegisterWrongUserPasswordHome').hide();

            $scope.email = '';
            $scope.username = '';
            $scope.password = '';
            $scope.passAgain = '';
            $scope.pin = '';

            RestService.login(data.username, data.password);
        });

        $rootScope.$on('wrongRegister', function(event, data) {
            $('#RegisterWrongUserPassword').show();
            $('#RegisterWrongUserPasswordHome').show();
        });

        $rootScope.$on('withoutNetworkConnection', function(event, data) {
            $('#RegisterWrongUserPassword').hide();
            $('#RegisterWrongUserPasswordHome').hide();
            var serverNotFound = $translate.instant('register.SERVER_NOT_FOUND');
            var networkConnection = $translate.instant('register.NETWORK_CONNECTION');
            growl.error(serverNotFound, {
                title: networkConnection
            });
        });

        $scope.raiseModalLogin = function() {
            $('#myModalRegisterHome').modal('hide');
            $('#myModal').modal('hide');
            $('#myModalLoginHome').modal('show');
        };

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

            var weProblem = $translate.instant('register.WE_PROBLEM');
            var loginProblem = $translate.instant('register.LOGIN_PROBLEM');
            growl.error(weProblem, {
                title: loginProblem
            });
        });
    }
]);