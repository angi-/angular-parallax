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

        // Find out if parallax affects an element top position or CSS property
        parallaxCssVal = attr.parallaxCss ? attr.parallaxCss : 'top';

        // Set the CSS key and value
        cssValArray = parallaxCssVal.split(':');
        cssKey = cssValArray[0];
        cssValue = cssValArray[1];

        isSpecialVal = cssValue ? true : false;
        if ( ! cssValue) cssValue = cssKey;

        parallaxRatio = attr.parallaxRatio ? +attr.parallaxRatio : 1.1;
        parallaxInitVal = attr.parallaxInitVal ? +attr.parallaxInitVal : 0;

        elm.css(cssKey, parallaxInitVal + 'px');

        /**
         * Function called by the scroll and touch move events
         */
        function _onScroll()
        {
          var
            /**
             * Result value applied to element's style
             * @type string
             */
            resultVal,

            /**
             * Calculated value
             * @type number
             */
            calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;

          if (isSpecialVal)
          {
            // Special values
            resultVal = '' + cssValue + '(' + calcVal + 'px)';
          }
          else
          {
            // Normal values
            resultVal = calcVal + 'px';
          }

          // Apply CSS
          elm.css(cssKey, resultVal);
        };

        // Listen for scroll and touch move events
        $window.addEventListener('scroll', _onScroll);
        $window.addEventListener('touchmove', _onScroll);
      }
    };
  }]);
