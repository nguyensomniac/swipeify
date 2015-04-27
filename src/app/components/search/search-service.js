'use strict';
angular.module('app')
  .service('searchService', function(artistSearchFactory, artistFactory, artistService){
    var searchString = ''
    return {
      setQuery: function(s)  {
        searchString = s;
      },
      setNewArtist: function(artist)  {
        //set current artist
        var currentArtist = new artistFactory(artist.id);
        artistService.initialize(currentArtist);
      },
      getArtists: function()  {
        //Searches for artists based on a search query. If name exactly matches name of first result, return true.
        //Else, return false.
        var self = this;
        var searchResults = new artistSearchFactory(encodeURIComponent(searchString));
        searchResults.details
          .$promise.then(function(result) {
            console.log(result);
            if (result[0] && result[0].name.toUpperCase() === searchString.toUpperCase()) {
              self.setNewArtist(result[0]);
              result.matchesQuery = true;
            }
            else  {
              result.matchesQuery = false;
            }
            return result;
          });
        return searchResults;
      }
    };
  });