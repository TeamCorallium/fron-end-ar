app.controller('HomeCtrl', ["$scope", "$state", "$rootScope", "RestService", "$cookies", "growl", "$translate", "Carousel", "$window",

    function($scope, $state, $rootScope, RestService, $cookies, growl, $translate, Carousel, $window) {

        $rootScope.OptionsEdit = false;
        $cookies.remove("exploreUser", {
            path: '/'
        });

        if ($cookies.get('sessionid')) {
            $rootScope.connected = true;
        } else {
            $rootScope.connected = false;
        }

        $rootScope.viewProfile = true;
        $scope.countLimit = 4;
        $scope.profiles = [];
        $scope.tracks = {
            totalVisits: 0,
            returnRatio: 0,
            timeOnSite: 0,
            unique: 0
        };

        if ($(window).width() >= 992) {
            $scope.countLimit = 4;
        } else if ($(window).width() >= 768) {
            $scope.countLimit = 3;
        }

        $scope.countBackers = 4;

        if ($(window).width() >= 992) {
            $scope.countBackers = 4;
        } else if ($(window).width() >= 768) {
            $scope.countBackers = 3;
        } else if ($(window).width() >= 480) {
            $scope.countBackers = 2;
        } else {
            $scope.countBackers = 1;
        }

        $(window).on("resize.doResize", function() {
            $scope.$apply(function() {
                if ($(window).width() >= 992) {
                    $scope.countLimit = 4;
                } else if ($(window).width() >= 768) {
                    $scope.countLimit = 3;
                }

                if ($(window).width() >= 992) {
                    $scope.countBackers = 4;
                } else if ($(window).width() >= 768) {
                    $scope.countBackers = 3;
                } else if ($(window).width() >= 480) {
                    $scope.countBackers = 2;
                } else {
                    $scope.countBackers = 1;
                }
            });
        });

        $scope.$on("$destroy", function() {
            $(window).off("resize.doResize"); //remove the handler added earlier
        });

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

        $scope.getProfiles = function() {
            RestService.fetchObjectByUrl(RestService.profileDir + '?ordering=-rating')
                .then(
                    function(data) {
                        $scope.profiles = data.results;

                        for (var i = 0; i < $scope.profiles.length; i++) {
                            if ($scope.profiles[i].avatar != '' && $scope.profiles[i].avatar != null) {
                                var avatarArray = $scope.profiles[i].avatar.split("/");
                                $scope.profiles[i].avatar = RestService.imageDir + avatarArray[avatarArray.length - 1];
                            } else {
                                $scope.profiles[i].avatar = 'HTML/assets/images/default-user.png';
                            }

                            $scope.profiles[i].fullname = shortNameFunction($scope.profiles[i].fullname);
                            $scope.profiles[i].owner = shortNameFunction($scope.profiles[i].owner);
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        $scope.getProfiles();

        $scope.goToProfile = function(owner) {
            $cookies.remove("exploreUser", {
                path: '/'
            });
            $cookies.put('exploreUser', owner, {
                path: '/'
            });

            if ($cookies.get('exploreUser') == $cookies.get('username')) {
                $state.go('profile');
            } else {
                $state.go('tshirts');
            }
        };

        $scope.getTracks = function() {
            RestService.fetchTracking().then(
                function(data) {
                    data = data.response;

                    $scope.tracks.totalVisits = data.total;
                    $scope.tracks.returnRatio = Math.round(data.return_ratio * 100) / 100;
                    $scope.tracks.timeOnSite = data.time_on_site;
                    $scope.tracks.unique = data.unique;
                },
                function(errResponse) {
                    console.log(errResponse);
                }
            );
        };

        $scope.getTracks();

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

            var weProblem = $translate.instant('home.WE_PROBLEM');
            var loginProblem = $translate.instant('home.LOGIN_PROBLEM');
            growl.error(weProblem, {
                title: loginProblem
            });
        });

        $rootScope.$on('LoginNetworkConnectionError', function(event, data) {
            var serverNotFound = $translate.instant('home.SERVER_NOT_FOUND');
            var networkConnection = $translate.instant('home.NETWORK_CONNECTION');
            growl.error(serverNotFound, {
                title: networkConnection
            });
        });

        if ($cookies.get('username')) {
            $scope.getCount();
        }

        $scope.fade = {
            slides: [
                'HTML/assets/images/slider/slide1.jpg',
                'HTML/assets/images/slider/slide2.jpg',
                'HTML/assets/images/slider/slide3.jpg',
            ]
        };

        $scope.backers = [{
                name: 'Juan Fung',
                backers: 'Golden Backer'
            },
            {
                name: 'Antonio Cedeño',
                backers: 'Golden Backer'
            },
            {
                name: 'Alejandro Ravelo',
                backers: 'Silver Backer'
            },
            {
                name: 'Raúl Velázquez',
                backers: 'Silver Backer'
            },
            {
                name: 'Steven Wang',
                backers: 'Silver Backer'
            },
            {
                name: 'Luna Yao',
                backers: 'Silver Backer'
            }
        ];

        $scope.galery = [
            'HTML/assets/images/gallery/1.JPG',
            'HTML/assets/images/gallery/2.JPG',
            'HTML/assets/images/gallery/3.JPG',
            'HTML/assets/images/gallery/4.JPG',
            'HTML/assets/images/gallery/5.JPG',
            'HTML/assets/images/gallery/6.JPG',
            'HTML/assets/images/gallery/7.JPG',
            'HTML/assets/images/gallery/8.JPG'
        ];

        $scope.imageOpenModal = '';

        $scope.OpenImage = function(num) {
            $scope.imageOpenModal = num;

            $('#openImage').modal('show');
        };

        $scope.closeImage = function(num) {
            $('#openImage').modal('hide');
        };

        $scope.prevImageModal = function() {
            $scope.imageOpenModal--;
        };

        $scope.nextImageModal = function() {
            $scope.imageOpenModal++;
        };

        $scope.slickConfig3 = {
            method: {},
            infinite: false,
            speed: 300,
            infinite: true,
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        $scope.goToLink = function() {
            $window.location.href = 'https://www.kickstarter.com/projects/856235450/797702255?ref=429235&token=9c07d5af';
        };

        var shortNameFunction = function(name) {
            var array = name;
            var nameAux = "";

            if (array.length > 14) {
                for (var i = 0; i <= 14; i++) {
                    nameAux = nameAux + array.charAt(i);
                }
                nameAux = nameAux + '...';
            } else {
                nameAux = name;
            }

            return nameAux;
        };

        var shortUserFunction = function(user) {
            var arrayUser = user;
            var nameAux = "";

            if (arrayUser.length > 14) {
                for (var i = 0; i <= 14; i++) {
                    nameAux = nameAux + arrayUser.charAt(i);
                }
                nameAux = nameAux + '...';
            } else {
                nameAux = user;
            }

            return nameAux;
        };
    }
]);