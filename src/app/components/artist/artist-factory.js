'use strict';
angular.module('app')
  .factory('artistFactory', function($resource){
    var baseUrl = 'https://api.spotify.com/v1/';
    var lastfmUrl = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&autocorrect=1&api_key=79d14cee5d01890da9ab6c1478e90f95&format=json&artist='
    var artist = function(id) {
      //used to get artist data given a spotify URL
      var self = this;
      this.artistId = id;
      this.details = $resource(baseUrl + 'artists/' + this.artistId).get();
      this.related = $resource(baseUrl + 'artists/' + this.artistId + '/related-artists', {}, {
        get: {
          method: 'GET',
          isArray: true,
          transformResponse: function(data) {
            return JSON.parse(data).artists
          }
        }
      }).get();
      this.topTracks = $resource(baseUrl + 'artists/' + this.artistId + '/top-tracks?country=US', {}, {
        get: {
          method: 'GET',
          isArray: true,
          transformResponse: function(data)  {
            return JSON.parse(data).tracks
          }
        }
      }).get();
      this.images = this.details.$promise.then(function(results){
        return $resource(lastfmUrl + results.name, {}, {
          get: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data) {
              return JSON.parse(data).artist.image
            }
          }
        }).get().$promise
      });
    }
    return artist
  });