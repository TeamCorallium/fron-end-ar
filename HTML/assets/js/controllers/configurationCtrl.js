app.controller('ConfigurationsCtrl', ["$rootScope", "$scope", "$stateParams", "RestService", "$state", "$cookies", "$window", "growl", "SweetAlert", "$translate", "$location", "$anchorScroll",
    function($rootScope, $scope, $stateParams, RestService, $state, $cookies, $window, growl, SweetAlert, $translate, $location, $anchorScroll) {

        $rootScope.OptionsEdit = false;
        $cookies.remove("exploreUser", {
            path: '/'
        });

        $scope.visibleProfile = true;
        $scope.visibleEmailNotifications = false;
        $scope.visibleEmail = false;

        if ($cookies.get('configVisible') == 'true') {
            $scope.switchProfile = true;
        } else {
            $scope.switchProfile = false;
        }

        if ($cookies.get('configEmailVisible') == 'true') {
            $scope.switchEmail = true;
        } else {
            $scope.switchEmail = false;
        }

        if ($cookies.get('configReceiveEmails') == 'true') {
            $scope.switchShowEmail = true;
        } else {
            $scope.switchShowEmail = false;
        }

        var flag = '';

        $scope.getCount = function() {
            RestService.fetchNotificationUnreaded()
                .then(
                    function(data) {
                        var count = data;

                        if (count > 9) {
                            $rootScope.notificationCount = '10';
                        } else {
                            $rootScope.notificationCount = count;
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        if ($cookies.get('username')) {
            $scope.getCount();
        }

        $scope.jumpToLocation = function(key) {
            $location.hash(key);
            $anchorScroll();
        }

        $scope.switchEmailChange = function() {
            flag = 'visible';
            RestService.updateConfiguration($scope.switchProfile, $scope.switchShowEmail, $scope.switchEmail)
        };

        $scope.switchProfileChange = function() {
            flag = 'profile';
            RestService.updateConfiguration($scope.switchProfile, $scope.switchShowEmail, $scope.switchEmail)
        };

        $scope.switchShowEmailChange = function() {
            flag = 'email';
            RestService.updateConfiguration($scope.switchProfile, $scope.switchShowEmail, $scope.switchEmail)
        };

        $rootScope.$on('wrongConfig', function(event, data) {
            if (flag = 'visible') {
                $scope.switchProfile != $scope.switchProfile;
            } else if (flag = 'profile') {
                $scope.switchEmail != $scope.switchEmaill;
            } else {
                $scope.switchShowEmail != $scope.switchShowEmail;
            }
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

            var weProblem = $translate.instant('user_profile.WE_PROBLEM');
            var loginProblem = $translate.instant('user_profile.LOGIN_PROBLEM');
            growl.error(weProblem, {
                title: loginProblem
            });
        });

        $rootScope.$on('LoginNetworkConnectionError', function(event, data) {
            var serverNotFound = $translate.instant('user_profile.SERVER_NOT_FOUND');
            var networkConnection = $translate.instant('user_profile.NETWORK_CONNECTION');
            growl.error(serverNotFound, {
                title: networkConnection
            });
        });

        $scope.changeSettingViews = function(num) {
            if (num == 1) {
                $scope.visibleProfile = true;
                $scope.visibleEmail = false;
                $scope.visibleEmailNotifications = false;
            } else if (num == 2) {
                $scope.visibleProfile = false;
                $scope.visibleEmail = true;
                $scope.visibleEmailNotifications = false;
            } else {
                $scope.visibleEmail = false;
                $scope.visibleEmailNotifications = true;
                $scope.visibleProfile = false;
            }
        };
    }
]);