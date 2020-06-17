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

  var showError = function (errorMessage) {
    var errorPopup = document.createElement('div');

    errorPopup.style.width = '100%';
    errorPopup.style.height = '50px';
    errorPopup.style.background = 'red';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.lineHeight = '50px';

    errorPopup.textContent = errorMessage;
    document.body.insertAdjacentElement('afterBegin', errorPopup);
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem,
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    showError: showError,
  };
})();

