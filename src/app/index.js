'use strict';

angular.module('app', [
  'ngAnimate',
  'ngTouch',
  'ngResource',
  'ui.router',
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'ng-draggabilly'
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('playing', {
        url: '/playing',
        templateUrl: 'app/play/play.html',
        controller: 'PlayCtrl'
      })

    $urlRouterProvider.otherwise('/');
  })
;
