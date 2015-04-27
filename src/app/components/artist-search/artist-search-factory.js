'use strict';
angular.module('app')
  .factory('artistSearchFactory', function($resource){
    var baseUrl = 'https://api.spotify.com/v1/search?&type=artist&q=';
    var results = function(query) {
      //get search results based on a search query. Used to get spotify ID of desired artist
      this.query = query;
      this.details = $resource(baseUrl + this.query, {}, {
        get: {
          method: 'GET',
          isArray: true,
          transformResponse: function(data)  {
            return JSON.parse(data).artists.items
          }
        }
        }).get();
    };
    return results
  });