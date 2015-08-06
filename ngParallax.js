angular
  /**
   * Angular parallax module
   */
  .module('ngParallax', [])

  /**
   * Angular parallax directive
   */
  .directive('parallax', ['$window', function ($window)
  {
    return {
      restrict: 'A',
      scope: {
        parallaxCss: '@',
        parallaxInitVal: '@',
        parallaxRatio: '@'
      },
      link: function(scope, elm, attr)
      {
        var cssKey,
          cssValue,
          isSpecialVal,
          parallaxCssVal,
          parallaxRatio,
          parallaxInitVal,
          cssValArray;

        parallaxCssVal = scope.parallaxCss ? scope.parallaxCss : 'top';
        cssValArray = parallaxCssVal.split(':');
        cssKey = cssValArray[0];
        cssValue = cssValArray[1];

        isSpecialVal = cssValue ? true : false;
        if (!cssValue) cssValue = cssKey;

        parallaxRatio = scope.parallaxRatio ? +scope.parallaxRatio : 1.1;
        parallaxInitVal = scope.parallaxInitVal ? +scope.parallaxInitVal : 0;

        elm.css(cssKey, parallaxInitVal + 'px');

        function _onScroll()
        {
          var
            resultVal,
            calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;

          if (isSpecialVal) {
            resultVal = '' + cssValue + '(' + calcVal + 'px)';
          } else {
            resultVal = calcVal + 'px';
          }

          elm.css(cssKey, resultVal);
        };

        $window.addEventListener('scroll', _onScroll);
        $window.addEventListener('touchmove', _onScroll);
      }
    };
  }]);
