'use strict';

angular.module("pulloverDir", [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngSanitize',
    'ngCookies',
    'ngFileUpload',
    'ngLoadingSpinner',
    'ngAnimate',
    'ngImgCrop',
    'ngtimeago',
    'angular-growl',
    'oitozero.ngSweetAlert',
    'pascalprecht.translate',
    'angular-notification-icons',
    'ngEmoticons',
    'uiSwitch',
    'ui.carousel',
    'slickCarousel',
    'angular-img-cropper'
]);

var app = angular.module('dirApp', ['pulloverDir']);