'use strict';

angular.module('app')
  .controller('MainCtrl', function ($scope, $state, searchService) {
    $scope.results = [];
  });
