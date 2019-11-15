'use strict';
(function () {
  var COLORS = {
    'coat': ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    'eyes': ['black', 'red', 'blue', 'yellow', 'green'],
    'fireball': ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  window.colorize = {
    getRandomColor: function (colorsType) {
      var newColor = COLORS[colorsType][window.util.getRandomInt(0, COLORS[colorsType].length - 1)];
      return newColor;
    },
    updateColorOfElement: function (wizardElement, inputField, colorsType) {
      var newColor = this.getRandomColor(colorsType);

      if (wizardElement.classList.contains('setup-fireball')) {
        wizardElement.parentElement.style.backgroundColor = newColor;
      } else {
        wizardElement.style.fill = newColor;
      }

      inputField.value = newColor;
    }
  };

})();
