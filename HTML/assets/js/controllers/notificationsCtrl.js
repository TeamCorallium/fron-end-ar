app.controller('NotificationsCtrl', ["$rootScope", "$scope", "$stateParams", "RestService", "$state", "$cookies", "$window", "growl", "SweetAlert", "$translate", "filterFilter",
    function($rootScope, $scope, $stateParams, RestService, $state, $cookies, $window, growl, SweetAlert, $translate, filterFilter) {

        $rootScope.OptionsEdit = false;
        $rootScope.notificationCount = 0;

        $cookies.remove("exploreUser", {
            path: '/'
        });

        $scope.showEmail = '';
        $scope.showShortEmailBox = false;

        $scope.user = {
            profileUrl: '',
            username: '',
            showUsername: '',
            firstname: '',
            lastname: '',
            email: '',
            info: '',
            score: '',
            rating: '',
            avatar: 'HTML/assets/images/default-user.png',
            cover: '',
            coverId: '',
            id: '',
            qrcode: '',
            profileurl: '',
            fullname: '',
            phone: '',
            socialnetworks: [],
            tshirts: [],
            snippets: [],
            configVisible: '',
            configEmailVisible: '',
            configReceiveEmails: ''
        };

        $rootScope.notifications = [];

        $scope.limitSocialNetwork = 12;

        if ($(window).width() >= 1350) {
            $scope.limitSocialNetwork = 12;
        } else if ($(window).width() >= 1201) {
            $scope.limitSocialNetwork = 11;
        } else if ($(window).width() >= 992) {
            $scope.limitSocialNetwork = 8;
        } else if ($(window).width() >= 825) {
            $scope.limitSocialNetwork = 7;
        } else if ($(window).width() >= 768) {
            $scope.limitSocialNetwork = 6;
        } else if ($(window).width() >= 700) {
            $scope.limitSocialNetwork = 13;
        } else if ($(window).width() >= 650) {
            $scope.limitSocialNetwork = 12;
        } else if ($(window).width() >= 600) {
            $scope.limitSocialNetwork = 11;
        } else if ($(window).width() >= 550) {
            $scope.limitSocialNetwork = 10;
        } else if ($(window).width() >= 500) {
            $scope.limitSocialNetwork = 9;
        } else if ($(window).width() >= 450) {
            $scope.limitSocialNetwork = 8;
        } else if ($(window).width() >= 400) {
            $scope.limitSocialNetwork = 7;
        } else if ($(window).width() >= 350) {
            $scope.limitSocialNetwork = 6;
        } else {
            $scope.limitSocialNetwork = 5;
        }

        $(window).on("resize.doResize", function() {
            $scope.$apply(function() {
                if ($(window).width() >= 1350) {
                    $scope.limitSocialNetwork = 12;
                } else if ($(window).width() >= 1201) {
                    $scope.limitSocialNetwork = 11;
                } else if ($(window).width() >= 992) {
                    $scope.limitSocialNetwork = 8;
                } else if ($(window).width() >= 825) {
                    $scope.limitSocialNetwork = 7;
                } else if ($(window).width() >= 768) {
                    $scope.limitSocialNetwork = 6;
                } else if ($(window).width() >= 700) {
                    $scope.limitSocialNetwork = 13;
                } else if ($(window).width() >= 650) {
                    $scope.limitSocialNetwork = 12;
                } else if ($(window).width() >= 600) {
                    $scope.limitSocialNetwork = 11;
                } else if ($(window).width() >= 550) {
                    $scope.limitSocialNetwork = 10;
                } else if ($(window).width() >= 500) {
                    $scope.limitSocialNetwork = 9;
                } else if ($(window).width() >= 450) {
                    $scope.limitSocialNetwork = 8;
                } else if ($(window).width() >= 400) {
                    $scope.limitSocialNetwork = 7;
                } else if ($(window).width() >= 350) {
                    $scope.limitSocialNetwork = 6;
                } else {
                    $scope.limitSocialNetwork = 5;
                }
            });
        });

        $scope.getUser = function(username) {
            RestService.fetchUserByUser(username)
                .then(
                    function(data) {
                        data = data.results;
                        if (data.length > 0) {
                            $scope.user.profileUrl = data[0].profiles[0];
                            $scope.user.username = data[0].username;
                            $scope.user.showUsername = shortNameFunction($scope.user.username);
                            $scope.user.firstname = data[0].first_name;
                            $scope.user.lastname = data[0].last_name;

                            if (data[0].profiles.length > 0) {
                                getProfile(data[0].profiles[0]);
                            }

                            getSocialNetworks(data[0].username);
                            getCoverPicture(data[0].username);

                        } else {
                            $state.go('home');
                            $('#myModal').modal('show');
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        var getProfile = function(url) {
            url = url.replace("/api", RestService.urlBaseDir);
            RestService.fetchObjectByUrl(url)
                .then(
                    function(data) {

                        if (data != undefined) {
                            $scope.user.info = data.info;
                            if (data.avatar != '' && data.avatar != null) {
                                var avatarArray = data.avatar.split("/");
                                $scope.user.avatar = RestService.imageDir + avatarArray[avatarArray.length - 1];
                            } else {
                                $scope.user.avatar = 'HTML/assets/images/default-user.png';
                            }
                            $scope.user.id = data.id;
                            $scope.user.email = data.email;
                            $scope.shortEmail();
                            $scope.user.score = data.score;
                            $scope.user.rating = data.rating;
                            $scope.user.fullname = data.fullname;
                            $scope.shortName();
                            $scope.user.phone = data.phone;
                            $scope.user.profileurl = data.url;
                            $scope.user.configVisible = data.confVisible;
                            $scope.user.configEmailVisible = data.confEmailVisible;
                            $scope.user.configReceiveEmails = data.confReceiveMails;

                            $cookies.put('configVisible', $scope.user.configVisible, {
                                path: '/'
                            });

                            $cookies.put('configEmailVisible', $scope.user.configEmailVisible, {
                                path: '/'
                            });

                            $cookies.put('configReceiveEmails', $scope.user.configReceiveEmails, {
                                path: '/'
                            });

                            if (data.qrcode != '') {
                                $scope.user.qrcode = RestService.imageDir + data.qrcode;
                            }
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        var getTshirts = function(urls) {
            for (var i = 0; i < urls.length; i++) {
                url = url.replace("/api", RestService.urlBaseDir);
                RestService.fetchObjectByUrl(urls[i])
                    .then(
                        function(data) {
                            $scope.user.tshirts.push(data);
                        },
                        function(errResponse) {
                            console.log(errResponse);
                        }
                    );
            }
        };

        var getSocialNetworks = function(username) {
            RestService.fetchSocialNetworks(username)
                .then(
                    function(data) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.user.socialnetworks.push(data[i]);
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        var getCoverPicture = function(username) {
            $scope.user.cover = '';
            RestService.fetchCoverPicture(username)
                .then(
                    function(data) {
                        if (data.length > 0) {
                            $scope.user.cover = $scope.getCover(data[0].banner);
                            $scope.user.coverId = data[0].id;
                            $scope.user.coverPictureUrl = data[0].url;
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        $scope.getCover = function(cover) {
            var dirCover = '';

            if (cover != '' && cover != null) {
                var coverArray = cover.split("/");
                dirCover = RestService.imageDir + coverArray[coverArray.length - 1];
            } else {
                dirAvatar = 'HTML/assets/images/profile.jpg';
            }

            return dirCover;
        };

        $scope.getUser($cookies.get('username'));

        $scope.goToLink = function(link) {
            $window.open(link, '_blank');
        };

        $scope.makeQRCode = function() {
            RestService.imageDownload($scope.user.id);
        };

        $scope.getPopularUsers = function() {
            RestService.fetchObjectByUrl(RestService.profileDir + '?ordering=-score')
                .then(
                    function(data) {
                        $scope.users = data.results;

                        for (var i = 0; i < $scope.users.length; i++) {
                            $scope.users[i].fullname = shortNameFunction($scope.users[i].fullname);
                            $scope.users[i].owner = shortUserFunction($scope.users[i].owner);
                        }
                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        $scope.getPopularUsers();

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

        $scope.getAvatar = function(avatar) {
            var dirAvatar = '';

            if (avatar != '' && avatar != null) {
                var avatarArray = avatar.split("/");
                dirAvatar = RestService.imageDir + avatarArray[avatarArray.length - 1];
            } else {
                dirAvatar = 'assets/images/default-user.png';
            }

            return dirAvatar;
        };

        $scope.noPrevious = function() {
            return $scope.hasPrevious == null;
        };

        $scope.noNext = function() {
            return $scope.hasNext == null;
        };

        $scope.next = function() {
            if (!$scope.noNext()) {
                $scope.currentPage += 1;
            }
        };

        $scope.previous = function() {
            if (!$scope.noPrevious()) {
                $scope.currentPage -= 1;
            }
        };

        $scope.getStars = function(rating) {
            var val = parseFloat(rating);
            var size = val / 5 * 100;
            return size + '%';
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

        $scope.getNotifications = function() {
            RestService.fetchNotification()
                .then(
                    function(data) {
                        $rootScope.notifications = data;

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].profileAvatar != '' && data[i].profileAvatar != null) {
                                var avatarArray = data[i].profileAvatar.split("/");
                                $rootScope.notifications[i].profileAvatar = RestService.imageDir + avatarArray[avatarArray.length - 1];
                            } else {
                                $rootScope.notifications[i].profileAvatar = 'assets/images/default-user.png';
                            }
                        }

                    },
                    function(errResponse) {
                        console.log(errResponse);
                    }
                );
        };

        $scope.getNotifications();

        $scope.deleteNotification = function(url) {
            for (var i = 0; i < $rootScope.notifications.length; i++) {
                if ($rootScope.notifications[i].url == url) {
                    $rootScope.notifications.splice(i, 1);
                }
            }

            url = url.replace("/api", RestService.urlBaseDir);
            RestService.deleteNotification(url);
        };

        $rootScope.$on('deleteNotification', function(event, data) {
            var deleteNotification = $translate.instant('notifications.DELETE_NOTIFICATION');
            growl.success(deleteNotification);
        });

        $scope.shortEmail = function() {
            var array = $scope.user.email.toString();
            var emailAux = "";

            if (array.length > 21) {
                $scope.showShortEmailBox = true;
                for (var i = 0; i <= 21; i++) {
                    emailAux = emailAux + array.charAt(i);
                }
                emailAux = emailAux + '...';
                $scope.showEmail = emailAux;
            } else {
                $scope.showShortEmailBox = false;
                $scope.showEmail = $scope.user.email;
            }
        };

        $scope.shortName = function() {
            var array = $scope.user.fullname.toString();
            var nameAux = "";

            if (array.length > 21) {
                $scope.showShortNameBox = true;
                for (var i = 0; i <= 21; i++) {
                    nameAux = nameAux + array.charAt(i);
                }
                nameAux = nameAux + '...';
                $scope.showName = nameAux;
            } else {
                $scope.showShortNameBox = false;
                $scope.showName = $scope.user.fullname;
            }
        };

        var shortNameFunction = function(name) {
            var array = name;
            var nameAux = "";

            if (array.length > 21) {
                for (var i = 0; i <= 21; i++) {
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

        $scope.mouseOverSocial = function(name, event) {
            $scope.SocialActive = name;

            var element = document.getElementById('HintSocialNetwork');

            element.style.position = "absolute";
            element.style.left = event.pageX + 15 + "px";
            element.style.top = event.pageY + "px";
            element.style.visibility = "visible";
        };

        $scope.mouseLeaveSocial = function() {
            var element = document.getElementById('HintSocialNetwork');
            element.style.visibility = "hidden";
            $scope.SocialActive = '';
        };
    }
]);