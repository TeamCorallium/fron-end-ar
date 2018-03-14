app.controller('FAQCtrl', ["$scope", "RestService", "$state", "$rootScope", "$cookies", "$window",
    function($scope, RestService, $state, $rootScope, $cookies, $window) {

        $window.scrollTo(0, 0);

        $rootScope.OptionsEdit = false;
        $cookies.remove("exploreUser", { path: '/' });

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

    }
]);