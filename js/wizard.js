'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  window.wizard = {
    createArrayOfSimilar: function () {
      var wizards = [];

      var randomFirstNameIndexes = window.util.createRandomArrayIndex(FIRST_NAMES.length);
      var randomSecondNameIndexes = window.util.createRandomArrayIndex(SECOND_NAMES.length);

      for (var i = 0; i < WIZARDS_AMOUNT; i++) {
        var newWizard = {
          name: '',
          coatColor: '',
          eyesColor: ''
        };

        newWizard.name = FIRST_NAMES[randomFirstNameIndexes[i]] + ' ' + SECOND_NAMES[randomSecondNameIndexes[i]];
        newWizard.coatColor = window.colorize.getRandomColor('coat');
        newWizard.eyesColor = window.colorize.getRandomColor('eyes');

        wizards.push(newWizard);
      }

      return wizards;
    },

    getAmountSimilar: function () {
      return WIZARDS_AMOUNT;
    },

    createElement: function (wizardTemplate, wizardObject) {
      var wizardElement = wizardTemplate.cloneNode(true);

      var name = wizardTemplate.querySelector('.setup-similar-label');
      name.textContent = wizardObject.name;

      var coatColor = wizardElement.querySelector('.wizard-coat');
      coatColor.style.fill = wizardObject.coatColor;

      var eyesColor = wizardElement.querySelector('.wizard-eyes');
      eyesColor.style.fill = wizardObject.eyesColor;

      return wizardElement;
    }
  };
})();
