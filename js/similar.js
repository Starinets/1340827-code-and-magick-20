'use strict';

(function () {
  var getSimilarWizardsData = window.data.getSimilarWizardsData;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarSetup = document.querySelector('.setup-similar');
  var similarIListList = document.querySelector('.setup-similar-list');

  var tuneSimilarWizard = function (similarWizardItem, wizard) {
    var setupSimilarLabel = similarWizardItem.querySelector('.setup-similar-label');
    var setupSimilarCoat = similarWizardItem.querySelector('.wizard-coat');
    var setupSimilarEyes = similarWizardItem.querySelector('.wizard-eyes');

    setupSimilarLabel.textContent = wizard.name + ' ' + wizard.lastName;
    setupSimilarCoat.style.fill = wizard.coatColor;
    setupSimilarEyes.style.fill = wizard.eyesColor;

    return similarWizardItem;
  };

  var drawWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      var similarWizardItem = similarWizardTemplate.cloneNode(true);
      fragment.appendChild(tuneSimilarWizard(similarWizardItem, wizard));
    });

    return fragment;
  };

  var wizards = getSimilarWizardsData();

  var fragment = drawWizards(wizards);

  similarIListList.appendChild(fragment);

  similarSetup.classList.remove('hidden');
})();
