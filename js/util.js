'use strict';

(function () {
  var getRandomInteger = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  window.util = {
    getRandomInteger: getRandomInteger,
  };
})();

