app.controller('GalleryCtrl', ["$scope", "$state", "$cookies", "$window",
    function($scope, $state, $cookies, $window) {
        
        $scope.objects3d = [];

        $scope.goToObject = function() {
            $state.go('object');
        };
    }
]);