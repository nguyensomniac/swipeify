angular.module('app')
  .directive('musicCard', function()  {
    return  {
      scope: {
        topTrack: '=',
        rightSwipe: '=',
        leftSwipe: '='
      },
      controller: function($scope, $element)  {
        var threshold = 200;
        var resetPosition = function()  {
          $element.children('videogular').css('transform', 'rotate(0deg)');
          $element.find('.music-card-player').css('top', 0);
          $element.find('.music-card-player').css('left', 0);
        }
        $scope.swipeLeft = function() {
          if($element.hasClass('left-swipe-in') || $element.hasClass('right-swipe-in')) {
                $element.removeClass('left-swipe-in');
                $element.removeClass('right-swipe-in');
          }
          $element.addClass('left-swipe-out');
              $element.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function(e) {
                $scope.leftSwipe();
                resetPosition();
                $element.removeClass('left-swipe-out');
                $element.addClass('left-swipe-in');
                console.log($element.hasClass('left-swipe-out'));
          });
        }
        $scope.swipeRight = function()  {
          if($element.hasClass('left-swipe-in') || $element.hasClass('right-swipe-in')) {
                $element.removeClass('left-swipe-in');
                $element.removeClass('right-swipe-in');
          }
          $element.addClass('right-swipe-out');
              $element.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function(e) {
                $scope.rightSwipe();
                resetPosition();
                $element.removeClass('right-swipe-out');
                $element.addClass('right-swipe-in');
                console.log($element.hasClass('right-swipe-out'));
          });
        }
        $scope.evts = {
          dragMove: function(instance, event, pointer) {
            var wrapperWidth = function() {
              return window.innerWidth;
            }
            $element.children('videogular').css('transform', 'rotate(' + (45 * instance.position.x / wrapperWidth()) + 'deg)');
            if(instance.position.x > threshold) {
              $element.addClass('right-swipe-active');
            }
            else if(instance.position.x < -1 * threshold) {
              $element.addClass('left-swipe-active');
            }
            else  {
              $element.removeClass('right-swipe-active').removeClass('left-swipe-active');
            }
          },
          dragEnd: function(instance, event, pointer) {
            $element.removeClass('right-swipe-active').removeClass('left-swipe-active');
            if(instance.position.x > threshold) {
              $scope.swipeRight();
            }
            else if(instance.position.x < -1 * threshold) {
              $scope.swipeLeft();
            }
            else  {
              resetPosition();
            }
          }
        }
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/card/card.html'
    }
  })