app.controller('AdminViewCtrl', ["$rootScope", "$scope", "$stateParams", "RestService", "$state", "$cookies", "$window", "growl",
    function($rootScope, $scope, $stateParams, RestService, $state, $cookies, $window, growl) {

        if ($cookies.get('username') != 'admin') {
            $state.go('home');
        }

        $rootScope.OptionsEdit = false;
        $cookies.remove("exploreUser", {
            path: '/'
        });

        $scope.stuff = {
            color: 'White',
            size: 'S',
            code: '',
            pin: ''
        };

        $scope.users = [];
        $scope.stocks = [];
        $scope.currentPage = 1;
        $scope.hasNext = '';
        $scope.hasPrevious = '';
        $scope.search = '';

        $scope.getStocks = function() {
            $scope.stocks = [];
            RestService.fetchStocks()
                .then(function(data) {
                        $scope.stocks = data;
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        $scope.getStocks();

        $scope.addStuff = function() {
            RestService.addStock($scope.stuff.color, $scope.stuff.size, $scope.stuff.code, $scope.stuff.pin);
        };

        $scope.getUsers = function(page) {
            RestService.fetchObjectByUrl(RestService.profileDir + '?&search=' + $scope.search + '&page=' + page)
                .then(function(data) {
                        $scope.users = data.results;
                        $scope.hasNext = data.next;
                        $scope.hasPrevious = data.previous;

                        for (var i = 0; i < $scope.users.length; i++) {
                            if ($scope.users[i].avatar != '' && $scope.users[i].avatar != null) {
                                var avatarArray = $scope.users[i].avatar.split("/");
                                $scope.users[i].avatar = RestService.imageDir + avatarArray[avatarArray.length - 1];
                            } else {
                                $scope.users[i].avatar = 'assets/images/default-user.png';
                            }
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        $scope.getUsers(1);

        $scope.noPrevious = function() {
            return $scope.hasPrevious == null;
        };

        $scope.noNext = function() {
            return $scope.hasNext == null;
        };

        $scope.next = function() {
            if (!$scope.noNext()) {
                $scope.currentPage += 1;
                $scope.getUsers($scope.currentPage);
            }
        };

        $scope.previous = function() {
            if (!$scope.noPrevious()) {
                $scope.currentPage -= 1;
                $scope.getUsers($scope.currentPage);
            }
        };

        $scope.searchUsers = function() {
            $scope.getUsers(1);
        };

        $("#searchUsersInput").on('keyup', function(e) {
            if (e.keyCode == 13) {
                $scope.getUsers(1);
            }
        });

        $scope.deleteUser = function(id) {
            RestService.deleteUser(id);
        };

        $scope.deleteStuff = function(url) {
            url = url.replace("/api", RestService.urlBaseDir);
            RestService.deleteStuff(url);
        };

        $rootScope.$on('deleteUser', function(event, data) {
            $scope.getUsers(1);
        });

        $rootScope.$on('deleteStuff', function(event, data) {
            $scope.getStocks();
        });

        $rootScope.$on('addStock', function(event, data) {
            $scope.stuff = {
                color: 'White',
                size: 'S',
                code: '',
                pin: ''
            };
            $scope.getStocks();
        });

        $rootScope.$on('addStockError', function(event, data) {
            growl.error("Can not be added to the stock.", {
                title: 'Add Stock'
            });
        });

        $rootScope.$on('deleteUserError', function(event, data) {
            growl.error("The user can not be deleted.", {
                title: 'Delete User'
            });
        });

        $rootScope.$on('deleteStuffError', function(event, data) {
            growl.error("The stuff can not be deleted.", {
                title: 'Delete Stuff'
            });
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

            var weProblem = $translate.instant('admin.WE_PROBLEM');
            var loginProblem = $translate.instant('admin.LOGIN_PROBLEM');
            growl.error(weProblem, {
                title: loginProblem
            });
        });

        $rootScope.$on('LoginNetworkConnectionError', function(event, data) {
            var serverNotFound = $translate.instant('admin.SERVER_NOT_FOUND');
            var networkConnection = $translate.instant('admin.NETWORK_CONNECTION');
            growl.error(serverNotFound, {
                title: networkConnection
            });
        });
    }
]);