'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupPlayer = setup.querySelector('.setup-player');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = window.wizard.createArrayOfSimilar();

  wizardCoat.addEventListener('click', function (evt) {
    console.log('oncoatclick');
    var inputField = setupPlayer.querySelector('[name="coat-color"]');
    window.colorize.updateColorOfElement(evt.target, inputField, 'coat');
  });

  wizardEyes.addEventListener('click', function (evt) {
    var inputField = setupPlayer.querySelector('[name="eyes-color"]');
    window.colorize.updateColorOfElement(evt.target, inputField, 'eyes');
  });

  wizardFireball.addEventListener('click', function (evt) {
    var inputField = setupPlayer.querySelector('[name="fireball-color"]');
    window.colorize.updateColorOfElement(evt.target, inputField, 'fireball');
  });

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = window.wizard.createElement(similarWizardTemplate, wizards[i]);
    fragment.appendChild(wizardElement);
  }

  similarListElement.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');
})();
