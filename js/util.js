'use strict';

(function () {
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var isEnterEvent = function (evt) {
    return evt.code === EventKeyCode.ENTER
        || evt.code === EventKeyCode.NUMPAD_ENTER;
  };

  var isEscapeEvent = function (evt) {
    return evt.code === EventKeyCode.ESCAPE;
  };

  var getRandomInteger = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var getRandomItem = function (items, oldItem) {
    var item = items[getRandomInteger(items.length - 1)];

    if (item === oldItem) {
      item = getRandomItem(items, oldItem);
    }

    return item;
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem,
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
  };
})();

