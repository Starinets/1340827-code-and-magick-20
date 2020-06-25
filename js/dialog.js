'use strict';

(function () {
  var FORM_ACTION = 'https://javascript.pages.academy/code-and-magick';

  var setupWizard = document.querySelector('.setup');
  var setupWizardForm = setupWizard.querySelector('.setup-wizard-form');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpenButton.querySelector('.setup-open-icon');
  var setupCloseButton = setupWizardForm.querySelector('.setup-close');

  var wizardRobe = setupWizardForm.querySelector('.wizard-coat');
  var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
  var wizardFire = setupWizardForm.querySelector('.setup-fireball-wrap');

  var wizardRobeColor = setupWizardForm.querySelector('input[name="coat-color"]');
  var wizardEyesColor = setupWizardForm.querySelector('input[name="eyes-color"]');
  var wizardFireColor = setupWizardForm.querySelector('input[name="fireball-color"]');

  var wizardNameInput = setupWizardForm.querySelector('.setup-user-name');

  var onWizardRobeClick = function () {
    wizardRobeColor.value
        = wizardRobe.style.fill
        = window.color.getRandomRobe(wizardRobeColor.value);

    var robeColor = wizardRobeColor.value;
    var eyesColor = wizardEyesColor.value;
    window.debounce(function () {
      window.similar.drawWizards(robeColor, eyesColor);
    })();
  };

  var onWizardEyesClick = function () {
    wizardEyesColor.value
        = wizardEyes.style.fill
        = window.color.getRandomEyes(wizardEyesColor.value);

    var robeColor = wizardRobeColor.value;
    var eyesColor = wizardEyesColor.value;
    window.debounce(function () {
      window.similar.drawWizards(robeColor, eyesColor);
    })();
  };

  var onWizardFireClick = function () {
    wizardFireColor.value
        = wizardFire.style.background
        = window.color.getRandomFire(wizardFireColor.value);
  };

  var onSetupOpenButtonClick = function () {
    showWizardSetup();
  };

  var onSetupCloseButtonClick = function () {
    hideWizardSetup();
  };

  var onSetupOpenButtonKeydown = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      showWizardSetup();
    }
  };

  var onSetupCloseButtonKeydown = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      hideWizardSetup();
    }
  };

  var onKeydown = function (evt) {
    if (window.util.isEscapeEvent(evt) && evt.target !== wizardNameInput) {
      hideWizardSetup();
    }
  };

  var onSetupWizardFormSubmit = function (evt) {
    evt.preventDefault();

    var onLoad = function () {
      hideWizardSetup();
    };

    var onError = function (error) {
      window.util.showError(error);
    };

    var data = new FormData(setupWizardForm);

    window.backend.save(data, onLoad, onError);
  };

  var showWizardSetup = function () {
    setupWizard.classList.remove('hidden');

    wizardRobe.addEventListener('click', onWizardRobeClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFire.addEventListener('click', onWizardFireClick);

    setupCloseButton.addEventListener('click', onSetupCloseButtonClick);
    setupOpenButton.removeEventListener('click', onSetupOpenButtonClick);

    setupOpenButton.removeEventListener('keydown', onSetupOpenButtonKeydown);
    setupCloseButton.addEventListener('keydown', onSetupCloseButtonKeydown);
    document.addEventListener('keydown', onKeydown);

    setupWizardForm.addEventListener('submit', onSetupWizardFormSubmit);

    window.similar.drawWizards(wizardEyesColor.value, wizardRobeColor.value);
  };

  var hideWizardSetup = function () {
    setupWizard.classList.add('hidden');

    wizardRobe.removeEventListener('click', onWizardRobeClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFire.removeEventListener('click', onWizardFireClick);

    setupCloseButton.removeEventListener('click', onSetupCloseButtonClick);
    setupOpenButton.addEventListener('click', onSetupOpenButtonClick);

    setupOpenButton.addEventListener('keydown', onSetupOpenButtonKeydown);
    setupCloseButton.removeEventListener('keydown', onSetupCloseButtonKeydown);
    document.removeEventListener('keydown', onKeydown);

    setupWizardForm.removeEventListener('submit', onSetupWizardFormSubmit);
  };

  setupWizardForm.action = FORM_ACTION;

  setupOpenIcon.tabIndex = '0';
  setupCloseButton.tabIndex = '0';

  wizardNameInput.minLength = '2';

  setupOpenButton.addEventListener('keydown', onSetupOpenButtonKeydown);
  setupOpenButton.addEventListener('click', onSetupOpenButtonClick);
})();
