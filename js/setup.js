'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getWizardsView = function () {
  var wizards = [];

  var getRandomInteger = window.util.getRandomInteger;

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomInteger(8)],
      lastName: WIZARD_LAST_NAMES[getRandomInteger(8)],
      coatColor: WIZARD_COAT_COLORS[getRandomInteger(6)],
      eyesColor: WIZARD_EYES_COLORS[getRandomInteger(5)],
    });
  }

  return wizards;
};

var addWizardToFragment = function (wizard, wizardElement) {
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name
    + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var drawWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  wizards.forEach(function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    fragment.appendChild(addWizardToFragment(wizard, wizardElement));
  });

  return fragment;
};

document.querySelector('.setup').classList.remove('hidden');

var similarIListElement = document.querySelector('.setup-similar-list');

var wizards = getWizardsView();

var fragment = drawWizards(wizards);

similarIListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
