app.factory('RestService', ['$rootScope', '$http', '$q', '$cookies', '$httpParamSerializer', '$state', function($rootScope, $http, $q, $cookies, $httpParamSerializer, $state) {

    // var tshirt = 'http://www.dir.com:8888/api/tshirts/';
    // var users = 'http://www.dir.com:8888/api/users/';
    // var profiles = 'http://www.dir.com:8888/api/profiles/';
    // var login = 'http://www.dir.com:8888/api/api-auth/login/';
    // var loginNext = 'http://www.dir.com:8888/api/api-auth/login/?next=/';
    // var register = 'http://www.dir.com:8888/api/api-auth/register/';
    // var snippets = 'http://www.dir.com:8888/api/snippets/';
    // var socialnetwork = 'http://www.dir.com:8888/api/socialnetworks/';
    // var imageDir = 'http://www.dir.com/images/';
    // var imageDownload = 'http://www.dir.com:8888/api/qrcode';
    // var updateWithOutImage = 'http://www.dir.com:8888/api/updateprofile';
    // var messages = 'http://www.dir.com:8888/api/messages/';
    // var sendMessages = 'http://www.dir.com:8888/api/send-message/';
    // var leaveMessages = 'http://www.dir.com:8888/api/leave-message/';
    // var updatePassword = 'http://www.dir.com:8888/api/api-auth/update/';
    // var clapDir = 'http://www.dir.com:8888/api/clap-profile/';
    // var linkStuff = 'http://www.dir.com:8888/api/link-stuff/';
    // var stocks = 'http://www.dir.com:8888/api/stocks/';
    // var deleteUser = 'http://www.dir.com:8888/api/delete-user/';
    // var tracking = 'http://www.dir.com:8888/api/track/';
    // var followDir = 'http://www.dir.com:8888/api/follow/';
    // var followersDir = 'http://www.dir.com:8888/api/followers/';
    // var unfollowDir = 'http://www.dir.com:8888/api/unfollow/';
    // var notifications = 'http://www.dir.com:8888/api/notifications/';
    // var notificationsUnreaded = 'http://www.dir.com:8888/api/notifications-unreaded/';
    // var profileConfig = 'http://www.dir.com:8888/api/setprofileconfig/';
    // var coverPicture = 'http://www.dir.com:8888/api/mediafiles/';

    var tshirt = 'https://www.dirstuff.com/server/api/tshirts/';
    var users = 'https://www.dirstuff.com/server/api/users/';
    var profiles = 'https://www.dirstuff.com/server/api/profiles/';
    var login = 'https://www.dirstuff.com/server/api/api-auth/login/';
    var loginNext = 'https://www.dirstuff.com/server/api/api-auth/login/?next=/';
    var register = 'https://www.dirstuff.com/server/api/api-auth/register/';
    var snippets = 'https://www.dirstuff.com/server/api/snippets/';
    var socialnetwork = 'https://www.dirstuff.com/server/api/socialnetworks/';
    var imageDir = 'https://www.dirstuff.com/images/';
    var imageDownload = 'https://www.dirstuff.com/server/api/qrcode';
    var updateWithOutImage = 'https://www.dirstuff.com/server/api/updateprofile';
    var messages = 'https://www.dirstuff.com/server/api/messages/';
    var sendMessages = 'https://www.dirstuff.com/server/api/send-message/';
    var leaveMessages = 'https://www.dirstuff.com/server/api/leave-message/';
    var updatePassword = 'https://www.dirstuff.com/server/api/api-auth/update/';
    var clapDir = 'https://www.dirstuff.com/server/api/clap-profile/';
    var linkStuff = 'https://www.dirstuff.com/server/api/link-stuff/';
    var stocks = 'https://www.dirstuff.com/server/api/stocks/';
    var deleteUser = 'https://www.dirstuff.com/server/api/delete-user/';
    var tracking = 'https://www.dirstuff.com/server/api/track/';
    var followDir = 'https://www.dirstuff.com/server/api/follow/';
    var followersDir = 'https://www.dirstuff.com/server/api/followers/';
    var unfollowDir = 'https://www.dirstuff.com/server/api/unfollow/';
    var notifications = 'https://www.dirstuff.com/server/api/notifications/';
    var notificationsUnreaded = 'https://www.dirstuff.com/server/api/notifications-unreaded/';
    var profileConfig = 'https://www.dirstuff.com/server/api/setprofileconfig/';
    var coverPicture = 'https://www.dirstuff.com/server/api/mediafiles/';

    var urlBase = '/server/api';
    // var urlBase = '/api';

    return {
        loginNext: loginNext,
        imageDir: imageDir,
        usersDir: users,
        profileDir: profiles,
        messageDir: messages,
        urlBaseDir: urlBase,
        coverPicture: coverPicture,

        getCookie: function(name) {
            console.log($cookies.getAll());
            return $cookies.get('csrftoken');
        },

        login: function(username, password) {
            $http({
                method: 'POST',
                url: login,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'username': username,
                    'password': password,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(result) {
                if (result['users'] != undefined && $cookies.get('sessionid') != undefined) {
                    $cookies.put('username', username, {
                        path: '/'
                    });
                    $rootScope.$broadcast('connected', username);
                } else {
                    $rootScope.$broadcast('wrongLogin', username);
                }
            }).error(function(response, status, header, config, statusText) { // data, status, header, config, statusText
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        register: function(username, password, email, pin) {
            $http({
                method: 'POST',
                url: register,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'username': username,
                    'password': password,
                    'email': email,
                    'pin': pin,
                    'first_name': "",
                    'last_name': ""
                }
            }).success(function(data) {
                if (data['response'] == 'ok') {
                    var register = {
                        username: username,
                        password: password
                    };
                    $rootScope.$broadcast('register', register);
                } else {
                    $rootScope.$broadcast('wrongRegister');
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('withoutNetworkConnection');
                }
            });
        },

        addSnippet: function(title, body) {
            $http({
                method: 'POST',
                url: snippets,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'title': title,
                    'body': body,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('addsnippets');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('addSnippetsError');
                }
            });
        },

        addSocialNetwork: function(name, url, type) {
            $http({
                method: 'POST',
                url: socialnetwork,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'name': name,
                    'url': url,
                    'type': type,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('addsocialnetwork');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('addSocialNetworkError');
                }
            });
        },

        addTShirt: function(pin) {
            $http({
                method: 'POST',
                url: linkStuff,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'pin': pin,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                if (data.response == 'ok') {
                    $rootScope.$broadcast('addTshirt');
                } else {
                    $rootScope.$broadcast('addTshirtErrorBad');
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        addStock: function(color, size, code, pin) {
            $http({
                method: 'POST',
                url: stocks,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'color': color,
                    'size': size,
                    'code': code,
                    'pin': pin,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('addStock');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('addStockError');
                }
            });
        },

        imageDownload: function(id) {
            $http({
                method: 'POST',
                url: imageDownload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'id': id
                }
            }).success(function(data) {
                $rootScope.$broadcast('imageDownloadSuccesfull', imageDir + data.qrfilename);
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('makeQRCodeError');
                }
            });
        },

        changePassword: function(username, password) {
            $http({
                method: 'POST',
                url: updatePassword,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'username': username,
                    'password': password,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('changepassword');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('changepasswordError');
                }
            });
        },

        sendMessage: function(sender, receiver, subject, body, readed) {
            $http({
                method: 'POST',
                url: sendMessages,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'sender': sender,
                    'receiver': receiver,
                    'subject': subject,
                    'body': body,
                    'readed': readed,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                if (data.response == "ok") {
                    $rootScope.$broadcast('SendMessage');
                } else {
                    $rootScope.$broadcast('SendMessageError');
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('WrongMessage');
                }
            });
        },

        leaveMessage: function(sender, subject, body) {
            $http({
                method: 'POST',
                url: leaveMessages,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'sender': sender,
                    'subject': subject,
                    'body': body
                }
            }).success(function(data) {
                if (data.response == "ok") {
                    $rootScope.$broadcast('LeaveMessage');
                } else {
                    $rootScope.$broadcast('LeaveMessageError');
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('WrongMessage');
                }
            });
        },

        takeClap: function(id, test) {
            $http({
                method: 'POST',
                url: clapDir,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'id': id,
                    'test': test,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                if (test && data.response == 'yes') {
                    $rootScope.$broadcast('testClapYes');
                } else if (test && data.response == 'not') {
                    $rootScope.$broadcast('testClapNo');
                } else if (!test) {
                    $rootScope.$broadcast('clapSuccesfully', data.response);
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('clapError');
                }
            });
        },

        deleteUser: function(id) {
            $http({
                method: 'POST',
                url: deleteUser,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'id': id,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('deleteUser');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('deleteUserError');
                }
            });
        },

        follow: function(id, test) {
            $http({
                method: 'POST',
                url: followDir,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'id': id,
                    'test': test,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                if (test && data.response == 'yes') {
                    $rootScope.$broadcast('testFollowYes');
                } else if (test && data.response == 'not') {
                    $rootScope.$broadcast('testFollowNo');
                } else if (!test) {
                    $rootScope.$broadcast('followSuccesfully', data.response);
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('followError');
                }
            });
        },

        unfollow: function(id) {
            $http({
                method: 'POST',
                url: unfollowDir,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    'id': id,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                if (data.response == 'bad') {
                    $rootScope.$broadcast('UnfollowBad');
                }
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('unfollowError');
                }
            });
        },

        updateCover: function(url, cover) {
            $http({
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'banner': cover,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('updateCover');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        updateProfile: function(profileurl, info, rating, score, avatar, fullname, email, phone, confVisible, confEmailVisible, confReceiveMails) {
            $http({
                method: 'PUT',
                url: profileurl,
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'info': info,
                    'rating': rating,
                    'score': score,
                    'avatar': avatar,
                    'fullname': fullname,
                    'email': email,
                    'phone': phone,
                    'confVisible': confVisible,
                    'confEmailVisible': confEmailVisible,
                    'confReceiveMails': confReceiveMails,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('updateProfile');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        updateProfileWithOutAvatar: function(profileurl, id, info, rating, score, fullname, email, phone) {
            $http({
                method: 'PUT',
                url: updateWithOutImage,
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'id': id,
                    'info': info,
                    'rating': rating,
                    'score': score,
                    'fullname': fullname,
                    'email': email,
                    'phone': phone,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('updateProfile');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        updateMessage: function(url, sender, receiver, subject, body, readed) {
            $http({
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'url': url,
                    'sender': sender,
                    'receiver': receiver,
                    'subject': subject,
                    'body': body,
                    'readed': readed,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('messageUpdated');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        updateSnippet: function(url, body) {
            $http({
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'title': '',
                    'body': body,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('snippetUpdated');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        updateSocial: function(url, name, type, id) {
            $http({
                method: 'PUT',
                url: socialnetwork + id + "/",
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'url': url,
                    'name': name,
                    'type': type,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                $rootScope.$broadcast('socialUpdated');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        updateConfiguration: function(visible, emailVisible, receiveMails) {
            $http({
                method: 'PUT',
                url: profileConfig,
                headers: {
                    'Content-Type': undefined,
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(data) {
                    if (data === undefined)
                        return data;
                    var fd = new FormData();
                    angular.forEach(data, function(value, key) {
                        if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(key, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(key + '_' + index, file);
                                });
                            }
                        } else {
                            fd.append(key, value);
                        }
                    });
                    return fd;
                },
                data: {
                    'visible': visible,
                    'emailVisible': emailVisible,
                    'receiveMails': receiveMails,
                    'csrfmiddlewaretoken': $cookies.get('csrftoken')
                }
            }).success(function(data) {
                if (data['response'] == 'ok') {
                    $rootScope.$broadcast('updateConfig');
                } else {
                    $rootScope.$broadcast('wrongConfig');
                }
            }).error(function(response, status, header, config, statusText) {
                $rootScope.$broadcast('wrongConfig');

                if (status == 403) {
                    $rootScope.$broadcast('forbidden');
                } else {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                }
            });
        },

        deleteSocialNetwork: function(id) {
            $http({
                method: 'DELETE',
                url: socialnetwork + id + '/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function(result) {
                $rootScope.$broadcast('deleteSocialNetwork');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('deleteSocialNetworkError');
                }
            });
        },

        deleteSnippet: function(url) {
            $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function(result) {
                $rootScope.$broadcast('deleteSnippet');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('deleteSnippetError');
                }
            });
        },

        deleteMessage: function(url) {
            $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function(result) {
                $rootScope.$broadcast('deleteMessage');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('deleteMessageError');
                }
            });
        },

        deleteStuff: function(url) {
            $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function(result) {
                $rootScope.$broadcast('deleteStuff');
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('deleteStuffError');
                }
            });
        },

        deleteNotification: function(url) {
            $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': $cookies.get('csrftoken')
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).success(function(result) {
                $rootScope.$broadcast('deleteNotification', url);
            }).error(function(response, status, header, config, statusText) {
                if (status == 403) {
                    $rootScope.$broadcast('forbidden', username);
                } else if (status == null) {
                    $rootScope.$broadcast('LoginNetworkConnectionError');
                } else {
                    $rootScope.$broadcast('deleteNotificationError');
                }
            });
        },

        fetchTshirt: function(code) {
            return $http.get(tshirt + "?code=" + code)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchUserByUser: function(username) {
            return $http.get(users + "?username=" + username)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchTracking: function() {
            return $http.get(tracking + '?start=2014-11&end=2018-12')
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchMessages: function() {
            return $http.get(messages)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchSocialNetworks: function(username) {
            return $http.get(socialnetwork + "?username=" + username)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchCoverPicture: function(username) {
            return $http.get(coverPicture + "?username=" + username)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchSnippets: function(username) {
            return $http.get(snippets + "?username=" + username)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchObjectByUrl: function(url) {
            return $http.get(url)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {

                    }
                );
        },

        fetchStocks: function() {
            return $http.get(stocks)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchFollowers: function(profileid, me) {
            return $http.get(followersDir + "?profileId=" + profileid + "&me=" + me)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchFollowing: function(profileid, me) {
            return $http.get(followersDir + "?profileId=" + profileid + "&me=" + me)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchNotification: function() {
            return $http.get(notifications)
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },

        fetchNotificationUnreaded: function() {
            return $http.get(notificationsUnreaded)
                .then(
                    function(response) {
                        return response.data.unreaded;
                    },
                    function(response, status, header, config, statusText) {
                        if (status == 403) {
                            $rootScope.$broadcast('forbidden', username);
                        } else {
                            $rootScope.$broadcast('LoginNetworkConnectionError');
                        }
                    }
                );
        },
    };
}]);