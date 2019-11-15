'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createRandomArrayIndex: function (arrayLength) {
      var array = [];
      for (var i = 0; i < arrayLength; i++) {
        array.push(i);
      }

      for (i = arrayLength - 1; i > 0; i--) {
        var j = this.getRandomInt(0, i);
        var temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    }
  };
})();
