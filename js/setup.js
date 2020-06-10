'use strict';

var FORM_ACTION = 'https://javascript.pages.academy/code-and-magick';
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
var ROBE_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIRE_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getWizardsView = function () {
  var wizards = [];

  var getRandomInteger = window.util.getRandomInteger;

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomInteger(8)],
      lastName: WIZARD_LAST_NAMES[getRandomInteger(8)],
      coatColor: ROBE_COLORS[getRandomInteger(6)],
      eyesColor: EYES_COLORS[getRandomInteger(5)],
    });
  }

  return wizards;
};

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

var wizards = getWizardsView();

var fragment = drawWizards(wizards);

similarIListList.appendChild(fragment);

similarSetup.classList.remove('hidden');

/* ------------------------------ module4-task1 ----------------------------- */

var setupWizard = document.querySelector('.setup');
var setupWizardform = setupWizard.querySelector('.setup-wizard-form');
var setupOpenButton = document.querySelector('.setup-open');
var setupOpenIcon = setupOpenButton.querySelector('.setup-open-icon');
var setupCloseButton = setupWizardform.querySelector('.setup-close');

var wizardRobe = setupWizardform.querySelector('.wizard-coat');
var wizardEyes = setupWizardform.querySelector('.wizard-eyes');
var wizardFire = setupWizardform.querySelector('.setup-fireball-wrap');

var wizardRobeColor = setupWizardform.querySelector('input[name="coat-color"]');
var wizardEyesColor = setupWizardform.querySelector('input[name="eyes-color"]');
var wizardFireColor = setupWizardform.querySelector('input[name="fireball-color"]');

var wizardNameInput = setupWizardform.querySelector('.setup-user-name');

var getRandomItem = function (items, oldItem) {
  var item = items[window.util.getRandomInteger(items.length - 1)];

  if (item === oldItem) {
    item = getRandomItem(items, oldItem);
  }

  return item;
};

var isEnterEvent = function (evt) {
  return evt.code === 'NumpadEnter' || evt.code === 'Enter';
};

var isEscapeEvent = function (evt) {
  return evt.code === 'Escape';
};

var onRobeClick = function () {
  var color = getRandomItem(ROBE_COLORS, wizardRobeColor.value);
  wizardRobeColor.value = color;
  wizardRobe.style.fill = color;
};

var onEyesClick = function () {
  var color = getRandomItem(EYES_COLORS, wizardEyesColor.value);
  wizardEyesColor.value = color;
  wizardEyes.style.fill = color;
};

var onFireClick = function () {
  var color = getRandomItem(FIRE_COLORS, wizardFireColor.value);
  wizardFireColor.value = color;
  wizardFire.style.background = color;
};

var showWizardSetup = function () {
  setupWizard.classList.remove('hidden');

  wizardRobe.addEventListener('click', onRobeClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFire.addEventListener('click', onFireClick);

  setupCloseButton.addEventListener('click', onWizardSetupCloseClick);
  setupOpenButton.removeEventListener('click', onSetupOpenButtonClick);

  setupOpenButton.removeEventListener('keydown', onSetupOpenButtonKeyDown);
  setupCloseButton.addEventListener('keydown', onWizardSetupKeyDown);
  document.addEventListener('keydown', onKeyDown);
};

var hideWizardSetup = function () {
  setupWizard.classList.add('hidden');

  wizardRobe.removeEventListener('click', onRobeClick);
  wizardEyes.removeEventListener('click', onEyesClick);
  wizardFire.removeEventListener('click', onFireClick);

  setupCloseButton.removeEventListener('click', onWizardSetupCloseClick);
  setupOpenButton.addEventListener('click', onSetupOpenButtonClick);

  setupOpenButton.addEventListener('keydown', onSetupOpenButtonKeyDown);
  setupCloseButton.removeEventListener('keydown', onWizardSetupKeyDown);
  document.removeEventListener('keydown', onKeyDown);
};

var onSetupOpenButtonClick = function () {
  showWizardSetup();
};

var onWizardSetupCloseClick = function () {
  hideWizardSetup();
};

var onSetupOpenButtonKeyDown = function (evt) {
  if (isEnterEvent(evt)) {
    showWizardSetup();
  }
};

var onWizardSetupKeyDown = function (evt) {
  if (isEnterEvent(evt)) {
    hideWizardSetup();
  }
};

var onKeyDown = function (evt) {
  if (isEscapeEvent(evt) && evt.target !== wizardNameInput) {
    hideWizardSetup();
  }
};

setupWizardform.action = FORM_ACTION;

setupOpenIcon.tabIndex = '0';
setupCloseButton.tabIndex = '0';

wizardNameInput.minLength = '2';

setupOpenButton.addEventListener('keydown', onSetupOpenButtonKeyDown);
setupOpenButton.addEventListener('click', onSetupOpenButtonClick);
