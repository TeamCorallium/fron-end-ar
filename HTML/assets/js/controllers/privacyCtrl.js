app.controller('PrivacyCtrl', ["$scope", "RestService", "$state", "$rootScope", "$window", "$cookies",
    function($scope, RestService, $state, $rootScope, $window, $cookies) {

        $window.scrollTo(0, 0);

        $rootScope.OptionsEdit = false;
        $cookies.remove("exploreUser", { path: '/' });

    }
]);