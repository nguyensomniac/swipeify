'use strict';

angular.module('app')
  .controller('PlayCtrl', function ($scope, $state, searchService, artistSearchFactory, artistFactory, artistService, playlistService) {
    $scope.results = []
    $scope.currentArtist = function() {
      return artistService.getCurrentArtist();
    };
    $scope.previousArtist = function()  {
      return artistService.getPreviousArtist();
    }
    $scope.getNewTrack = function() {
      artistService.setCurrentTrack().then(function() {
        $scope.topTrack = artistService.getCurrentTrack();
        console.log($scope.topTrack.images);
      });
    }
    $scope.playlistLength = function()  {
      return playlistService.savedLength();
    }
    $scope.setNextArtist = function(isrightSwipe) {
      var nextId = artistService.getNextArtist(isrightSwipe);
      var nextArtist = new artistFactory(nextId);
      playlistService.addSong(artistService.getCurrentTrack(), isrightSwipe);
      artistService.update(nextArtist, isrightSwipe);
      $scope.getNewTrack();
    }
    $scope.rightSwipe = function()  {
      //like - get related artists from current artist
      $scope.setNextArtist(true);
    }
    $scope.leftSwipe = function() {
      //no like :(((( - get related artists from previous artist right swiped
      $scope.setNextArtist(false);
    }
    $scope.goHome = function()  {
      $state.go('home');
    }
    $scope.modalShow = false;
    $scope.toggleModal = function() {
      if ($scope.modalShow === false) {
        $scope.modalShow = true;
      }
      else  {
        $scope.modalShow = false;
      }
    }
    $scope.savedSongs = playlistService.getSongs();
    $scope.getNewTrack();
  });
