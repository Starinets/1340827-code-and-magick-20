'use strict';

var FORM_ACTION = 'https://js.dump.academy/code-and-magick';
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
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
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

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var setupSimilarLabel = similarWizardTemplate.querySelector('.setup-similar-label');
var setupSimilarCoat = similarWizardTemplate.querySelector('.wizard-coat');
var setupSimilarEyes = similarWizardTemplate.querySelector('.wizard-eyes');

var similarSetup = document.querySelector('.setup-similar');
var similarIListElement = document.querySelector('.setup-similar-list');
var drawSimilarWizard = function (wizard) {
  setupSimilarLabel.textContent = wizard.name + ' ' + wizard.lastName;
  setupSimilarCoat.style.fill = wizard.coatColor;
  setupSimilarEyes.style.fill = wizard.eyesColor;
};

var drawWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    drawSimilarWizard(wizard);
    fragment.appendChild(similarWizardTemplate.cloneNode(true));
  });

  return fragment;
};

var wizards = getWizardsView();

var fragment = drawWizards(wizards);

similarIListElement.appendChild(fragment);

similarSetup.classList.remove('hidden');

/* ------------------------------ module4-task1 ----------------------------- */

var robeColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupWizard = document.querySelector('.setup');
var setupWizardform = setupWizard.children[0];
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupWizardform.querySelector('.setup-close');

var wizardRobe = setupWizardform.querySelector('.wizard-coat');
var wizardEyes = setupWizardform.querySelector('.wizard-eyes');
var wizardFire = setupWizardform.querySelector('.setup-fireball-wrap');

var wizardRobeColor = setupWizardform.querySelector('input[name="coat-color"]');
var wizardEyesColor = setupWizardform.querySelector('input[name="eyes-color"]');
var wizardFireColor = setupWizardform.querySelector('input[name="fireball-color"]');

var wizardNameInput = setupWizardform.querySelector('.setup-user-name');

var onRobeClick = function () {
  var color = robeColors[window.util.getRandomInteger(robeColors.length - 1)];
  wizardRobeColor.value = color;
  wizardRobe.style.fill = color;
};

var onEyesClick = function () {
  var color = eyesColors[window.util.getRandomInteger(eyesColors.length - 1)];
  wizardEyesColor.value = color;
  wizardEyes.style.fill = color;
};

var onFireClick = function () {
  var color = fireColors[window.util.getRandomInteger(fireColors.length - 1)];
  wizardFireColor.value = color;
  wizardFire.style.background = color;
};

var onWizardSetupOpenClick = function () {
  setupWizard.classList.remove('hidden');

  wizardRobe.addEventListener('click', onRobeClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFire.addEventListener('click', onFireClick);

  setupCloseButton.addEventListener('click', onWizardSetupCloseClick);
  setupOpenButton.removeEventListener('click', onWizardSetupOpenClick);

  setupOpenButton.removeEventListener('keydown', onWizardSetupOpenKeyDown);
  setupCloseButton.addEventListener('keydown', onWizardSetupKeyDown);
  document.addEventListener('keydown', onDocumentKeyDown);
};

var onWizardSetupCloseClick = function () {
  setupWizard.classList.add('hidden');

  wizardRobe.removeEventListener('click', onRobeClick);
  wizardEyes.removeEventListener('click', onEyesClick);
  wizardFire.removeEventListener('click', onFireClick);

  setupCloseButton.removeEventListener('click', onWizardSetupCloseClick);
  setupOpenButton.addEventListener('click', onWizardSetupOpenClick);

  setupOpenButton.addEventListener('keydown', onWizardSetupOpenKeyDown);
  setupCloseButton.removeEventListener('keydown', onWizardSetupKeyDown);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

var onWizardSetupOpenKeyDown = function (evt) {
  if (evt.code === 'NumpadEnter' || evt.code === 'Enter') {
    onWizardSetupOpenClick();
  }
};

var onWizardSetupKeyDown = function (evt) {
  if (evt.code === 'NumpadEnter' || evt.code === 'Enter') {
    onWizardSetupCloseClick();
  }
};

var onDocumentKeyDown = function (evt) {
  if (evt.code === 'Escape' && evt.target !== wizardNameInput) {
    onWizardSetupCloseClick();
  }
};

setupWizardform.action = FORM_ACTION;

setupOpenButton.children[0].setAttribute('tabindex', '0');
setupCloseButton.setAttribute('tabindex', '0');

wizardNameInput.setAttribute('minlength', 2);

setupOpenButton.addEventListener('keydown', onWizardSetupOpenKeyDown);
setupOpenButton.addEventListener('click', onWizardSetupOpenClick);
