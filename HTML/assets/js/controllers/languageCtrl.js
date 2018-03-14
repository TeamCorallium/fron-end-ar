app.controller('LanguageCtrl', ["$scope", "$state", "$translate", "$rootScope",
    function($scope, $state, $translate, $rootScope) {

        // angular translate
        // ----------------------

        $scope.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en': 'English',
                'es_ES': 'Spanish',
                'cn_CN': 'Chinese'
            },
            // display always the current ui language
            init: function() {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                // we know we have set a preferred one in app.config
                $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function(localeId, ev) {
                $translate.use(localeId);
                $scope.language.selected = $scope.language.available[localeId];
                $scope.language.listIsOpen = !$scope.language.listIsOpen;

                $state.reload();
            }
        };

        $scope.language.init();

        $rootScope.$on('$translateChangeSuccess', function() {
            console.log('translateChangeSuccess');
        });

    }
]);