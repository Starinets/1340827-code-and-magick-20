'use strict';

(function () {
  var ROBE_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIRE_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var getRandomRobeColor = function (oldColor) {
    return window.util.getRandomItem(ROBE_COLORS, oldColor);
  };

  var getRandomEyesColor = function (oldColor) {
    return window.util.getRandomItem(EYES_COLORS, oldColor);
  };

  var getRandomFireColor = function (oldColor) {
    return window.util.getRandomItem(FIRE_COLORS, oldColor);
  };

  var getRandomColorSaturation = function (hue, lightness) {
    var saturation = window.util.getRandomInteger(100);
    return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  };

  window.color = {
    getRandomRobe: getRandomRobeColor,
    getRandomEyes: getRandomEyesColor,
    getRandomFire: getRandomFireColor,
    getRandomSaturation: getRandomColorSaturation,
  };
})();
