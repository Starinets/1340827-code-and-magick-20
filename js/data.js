'use strict';

(function () {
  var getRandomItem = window.util.getRandomItem;
  var getRandomRobeColor = window.color.getRandomRobe;
  var getRandomEyesColor = window.color.getRandomEyes;

  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var getSimilarWizardsData = function () {
    var wizards = [];

    for (var i = 0; i < 4; i++) {
      wizards.push({
        name: getRandomItem(WIZARD_NAMES, null),
        lastName: getRandomItem(WIZARD_LAST_NAMES, null),
        coatColor: getRandomRobeColor(null),
        eyesColor: getRandomEyesColor(null),
      });
    }

    return wizards;
  };

  window.data = {
    getSimilarWizards: getSimilarWizardsData,
  };

})();
