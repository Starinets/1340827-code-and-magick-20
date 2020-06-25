'use strict';

(function () {
  var SHOW_ERROR_POPUP_TIMEOUT = 3000;
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var errorPopup;

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

  var createErrorPopup = function () {
    errorPopup = document.createElement('div');

    errorPopup.style.width = '100%';
    errorPopup.style.height = '50px';
    errorPopup.style.background = 'red';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.lineHeight = '50px';

    errorPopup.classList.add('hidden');

    document.body.insertAdjacentElement('afterBegin', errorPopup);
  };

  var hideError = function () {
    errorPopup.classList.add('hidden');
  };

  var showError = function (errorMessage) {
    errorPopup.textContent = errorMessage;
    errorPopup.classList.remove('hidden');
    setTimeout(hideError, SHOW_ERROR_POPUP_TIMEOUT);
  };

  createErrorPopup();

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem,
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    showError: showError,
  };
})();

