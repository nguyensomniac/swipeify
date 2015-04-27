'use strict';
angular.module('app')
  .directive('searchBar', function ($state, searchService, artistService) {
    return  {
      scope: {
        results: '=',
      },
      link: function(scope)  {
        scope.search = function()  {
          console.log('Searching..')
          searchService.setQuery(scope.query);
          var artist = searchService.getArtists();
          artist.details.$promise.then(function(result)  {
            scope.results = result;
            console.log(result);
            if (result.matchesQuery)  {
              artistService.setCurrentTrack();
              if ($state.includes('playing')) {
                $state.transitionTo($state.current, {}, {
                      reload: true,
                      inherit: false,
                      notify: true
                });
              }
              else  {
                $state.go('playing');
              }
            }
          });
        };
        scope.startRadio = function(artist) {
          searchService.setNewArtist(artist);
          artistService.setCurrentTrack();
          if ($state.includes('playing')) {
            $state.transitionTo($state.current, {}, {
                reload: true,
                inherit: false,
                notify: true
            });
          }
          else  {
            $state.go('playing');
          }
        };
      },
      controller: function($scope, $element)  {
        $element.find('.search-form-text').focusin(function() {
          $(this).parent().parent().addClass('search-active');
        }).focusout(function()  {
          $(this).parent().parent().removeClass('search-active');
        });
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/search/search-bar.html'
    };
  });