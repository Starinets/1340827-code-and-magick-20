'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var wizards = [];
  var wizardColors = {};

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarSetup = document.querySelector('.setup-similar');
  var similarIListList = document.querySelector('.setup-similar-list');

  var tuneSimilarWizard = function (similarWizardItem, wizard) {
    var setupSimilarLabel = similarWizardItem.querySelector('.setup-similar-label');
    var setupSimilarCoat = similarWizardItem.querySelector('.wizard-coat');
    var setupSimilarEyes = similarWizardItem.querySelector('.wizard-eyes');

    setupSimilarLabel.textContent = wizard.name;
    setupSimilarCoat.style.fill = wizard.colorCoat;
    setupSimilarEyes.style.fill = wizard.colorEyes;

    return similarWizardItem;
  };

  var rankWizards = function () {
    return wizards.map(function (item) {
      var eyesRank = wizardColors.eyes === item.colorEyes ? 1 : 0;
      var coatRank = wizardColors.coat === item.colorCoat ? 2 : 0;
      item.rank = eyesRank + coatRank;
      return item;
    })
    .sort(function (left, right) {
      if (left.rank > right.rank) {
        return -1;
      } else if (left.rank < right.rank) {
        return 1;
      } else {
        if (left.name > right.name) {
          return 1;
        } else if (left.name < right.name) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  };

  var renderWizards = function () {
    var fragment = document.createDocumentFragment();

    wizards = rankWizards();

    similarIListList.innerHTML = '';

    for (var index = 0; index < WIZARD_COUNT; index++) {
      var similarWizardItem = similarWizardTemplate.cloneNode(true);
      fragment.appendChild(tuneSimilarWizard(similarWizardItem, wizards[index]));
    }

    similarIListList.appendChild(fragment);
    similarSetup.classList.remove('hidden');
  };

  var onSuccess = function (response) {
    wizards = response;
    renderWizards();
  };

  var drawWizards = function (coatColor, eyesColor) {
    wizardColors.coat = coatColor;
    wizardColors.eyes = eyesColor;

    if (wizards.length === 0) {
      window.data.getSimilarWizards(onSuccess);
    } else {
      renderWizards();
    }
  };

  window.similar = {
    drawWizards: drawWizards,
  };
})();
