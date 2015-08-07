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
      link: function(scope, elm, attr)
      {
        var
          /**
           * CSS property key
           */
          cssKey,

          /**
           * CSS value
           */
          cssValue,

          /**
           * Is the CSS value a special value?
           */
          isSpecialVal,

          /**
           * Parallax CSS value
           */
          parallaxCssVal,

          /**
           * Parallax scroll ratio
           */
          parallaxRatio,

          /**
           * Parallax initial value
           */
          parallaxInitVal,

          /**
           * Array containing css property and value
           */
          cssValArray;

        parallaxCssVal = attr.parallaxCss ? attr.parallaxCss : 'top';
        cssValArray = parallaxCssVal.split(':');
        cssKey = cssValArray[0];
        cssValue = cssValArray[1];

        isSpecialVal = cssValue ? true : false;
        if (!cssValue) cssValue = cssKey;

        parallaxRatio = attr.parallaxRatio ? +attr.parallaxRatio : 1.1;
        parallaxInitVal = attr.parallaxInitVal ? +attr.parallaxInitVal : 0;

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
