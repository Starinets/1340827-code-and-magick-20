'use strict';

(function () {
  var getSimilarWizardsData = window.data.getSimilarWizards;

  var COUNT_OF_WIZARDS = 4;

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

  var drawWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var index = 0; index < COUNT_OF_WIZARDS; index++) {
      var similarWizardItem = similarWizardTemplate.cloneNode(true);
      fragment.appendChild(tuneSimilarWizard(similarWizardItem, wizards[index]));
    }

    similarIListList.appendChild(fragment);
    similarSetup.classList.remove('hidden');
  };

  getSimilarWizardsData(drawWizards);
})();
