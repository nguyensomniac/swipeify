//Keeps track of current and previous artists.
'use strict';
angular.module('app')
  .service('artistService', function(){
    var previousArtist = {};
    var currentArtist = {};
    var currentTrack = {};
    var trackImage = {};
    var formatName = function(name) {
      //Name is an array of names. If length is 1, return the name. Else, return a comma separated list (with & for last artist)
      console.log(name);
      function iterate(name, iterator)  {
        if (iterator === 1) { //only 1 name
          return name[0].name
        }
        else if (iterator === 2) { //2 names: add ampersand instead of comma
          return name[0].name + ' & ' + iterate(name.slice(1), iterator - 1);
        }
        else {
          return name[0].name + ', ' + iterate(name.slice(1), iterator - 1);
        }
      }
      return iterate(name, name.length);
    }
    var setCurrentTrack = function() {
      //randomly selects current track to one of an artist's most popular tracks. Returns artist and track data.
      //TODO: make sure tracks are not duplicates
      return currentArtist.images.then(function(result)  {
        trackImage = result[result.length - 1]['#text'];
        return currentArtist.topTracks.$promise;
      })
      .then(function(result)  {
        var randomIndex = Math.floor(Math.random() * result.length);
        currentTrack = {
          artist: currentArtist.details,
          details: result[randomIndex],
          images: trackImage,
          sources: [{
            src: result[randomIndex].preview_url,
            type: 'audio/mpeg'
          }]
        };
        return currentTrack.details.$promise;
      })
      .then(function(result)  {
        currentTrack.details.ars = formatName(currentTrack.details.artists);
        return currentTrack;
      })
    };
    var nextArtist = function(rightSwipe) {
      //picks artist to select related artists from based on swipe direction and returns the id
      var related = (rightSwipe) ? currentArtist : previousArtist;
      var randomIndex = Math.floor(Math.random() * related.related.length);
      return related.related[randomIndex].id;
    }
    return {
      getPreviousArtist: function() {
        return previousArtist;
      },
      getCurrentArtist: function()  {
        return currentArtist;
      },
      getNextArtist: function(rightSwipe) {
        //rightSwipe is a boolean: true for right, false for left
        return nextArtist(rightSwipe);
      },
      getCurrentTrack: function() {
        return currentTrack;
      },
      setCurrentTrack: function() {
        return setCurrentTrack();
      },
      initialize: function(artist){
        //Used to initially set up previous and current artists. Previous artist pertains to last artist
        //right swiped, so when first started, there is none yet :(
        previousArtist = artist;
        currentArtist = artist;
      },
      update: function(artist, isRightSwipe)  {
        //If right swiped, update previous artist
        previousArtist = (isRightSwipe) ? currentArtist : previousArtist;
        currentArtist = artist
      }
    };
  });