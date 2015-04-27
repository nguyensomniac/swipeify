'use strict';
angular.module('app')
  .service('playlistService', function($http)  {
    var songs = [];
    return {
      addSong: function(song, isRightSwipe) {
        song.isRightSwipe = isRightSwipe;
        songs.push(song);
        console.log('Added!')
        console.log(Object.keys(songs).length)
      },
      changeSwipe: function(id) {
        for(var i = 0; i < songs.length; i++)  {
          song = songs[i];
          if(id == song.details.id) {
            song.isRightSwipe = !song.isRightSwipe;
          }
        }
      },
      savedLength: function() {
        var len = 0;
        for(var i = 0; i < songs.length; i++)  {
          if(songs[i].isRightSwipe) {
            len++;
          }
        }
        return len;
      },
      length: function()  {
        return songs.length
      },
      getSongs: function()  {
        return songs
      }
    }
  });