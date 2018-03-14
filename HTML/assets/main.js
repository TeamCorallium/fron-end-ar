app.run(['$rootScope', '$cookies',
    function($rootScope, $cookies) {

        $rootScope.OptionsEdit = false;
        $rootScope.notifications = [];
        $rootScope.notificationCount = 0;

        $rootScope.userdata = {
            username: 'USER',
            connected: false,
            cover: ''
        };

        if ($cookies.get('username') != undefined) {
            $rootScope.userdata.username = $cookies.get('username');
            $rootScope.userdata.connected = true;
        }

        $rootScope.$on('connected', function(event, data) {
            $rootScope.userdata.username = $cookies.get('username');
            $rootScope.userdata.connected = true;
        });

        $rootScope.$on('logout', function(event, data) {
            $rootScope.userdata.username = 'USER';
            $rootScope.userdata.connected = false;
        });
    }
]);

app.filter("words", function() {
    return function(input, words) {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
            var inputWords = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '...';
            }
        }
        return input;
    };
});

app.filter('cut', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

app.controller("ImageCropperCtrl", ['$scope', function($scope) {
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.cropper.croppedImage = null;
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0;
}]);

app.controller('FormController', function($scope) {})

app.filter('passwordCount', [function() {
    return function(value, peak) {
        value = angular.isString(value) ? value : '';
        peak = isFinite(peak) ? peak : 7;

        return value && (value.length > peak ? peak + '+' : value.length);
    };
}])

// app.factory('zxcvbn', [function() {
//     return {
//         score: function() {
//             var compute = zxcvbn.apply(null, arguments);
//             return compute && compute.score;
//         }
//     };
// }])

app.directive('okPassword', [function() {
    return {
        // restrict to only attribute and class
        restrict: 'AC',

        // use the NgModelController
        require: 'ngModel',

        // add the NgModelController as a dependency to your link function
        link: function($scope, $element, $attrs, ngModelCtrl) {
            $element.on('blur change keydown', function(evt) {
                $scope.$evalAsync(function($scope) {
                    // update the $scope.password with the element's value
                    var pwd = $scope.password = $element.val();

                    // resolve password strength score using zxcvbn service
                    // $scope.passwordStrength = pwd ? (pwd.length > 7) : null;

                    // define the validity criterion for okPassword constraint
                    ngModelCtrl.$setValidity('okPassword', pwd.length > 7);
                });
            });
        }
    };
}]);

app.directive('pwCheck', [function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function() {
                scope.$apply(function() {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
}]);

app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(4000);
    growlProvider.globalDisableCountDown(true);
    growlProvider.onlyUniqueMessages(true);
}]);

// translate config
app.config(['$translateProvider',
    function($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: 'HTML/assets/i18n/',
            suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

        // Enable sanitize
        // $translateProvider.useSanitizeValueStrategy('sanitize');

        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escape');

    }
]);

window.fbAsyncInit = function() {
    FB.init({
        appId: '128874921166794',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.AppEvents.logPageView();
};