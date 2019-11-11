'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_AMOUNT = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomArrayIndex = function (arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
    array.push(i);
  }

  for (i = arrayLength - 1; i > 0; i--) {
    var j = getRandomInt(0, i);
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

var createWizardsArray = function (amount) {
  var wizards = [];

  var randomFirstNameIndexes = createRandomArrayIndex(FIRST_NAMES.length);
  var randomSecondNameIndexes = createRandomArrayIndex(SECOND_NAMES.length);
  var randomCoatColorIndexes = createRandomArrayIndex(COAT_COLORS.length);
  var randomEyesColorIndexes = createRandomArrayIndex(EYES_COLORS.length);

  for (var i = 0; i < amount; i++) {
    var newWizard = {
      name: '',
      coatColor: '',
      eyesColor: ''
    };

    newWizard.name = FIRST_NAMES[randomFirstNameIndexes[i]] + ' ' + SECOND_NAMES[randomSecondNameIndexes[i]];
    newWizard.coatColor = COAT_COLORS[randomCoatColorIndexes[i]];
    newWizard.eyesColor = EYES_COLORS[randomEyesColorIndexes[i]];

    wizards.push(newWizard);
  }

  return wizards;
};

var createWizardElement = function (wizardTemplate, wizardObject) {
  var wizardElement = wizardTemplate.cloneNode(true);

  var name = wizardTemplate.querySelector('.setup-similar-label');
  name.textContent = wizardObject.name;

  var coatColor = wizardElement.querySelector('.wizard-coat');
  coatColor.style.fill = wizardObject.coatColor;

  var eyesColor = wizardElement.querySelector('.wizard-eyes');
  eyesColor.style.fill = wizardObject.eyesColor;

  return wizardElement;
};

var updateColorOfElement = function (wizardElement, inputName, colors) {
  var selector = '[name="' + inputName + '"]';
  var inputField = setupPlayer.querySelector(selector);

  var newColor = colors[getRandomInt(0, colors.length - 1)];
  if (wizardElement.classList.contains('setup-fireball')) {
    wizardElement.parentElement.style.backgroundColor = newColor;
  } else {
    wizardElement.style.fill = newColor;
  }

  inputField.value = newColor;
};

var onPopupEscPress = function (evt) {
  var userNameInput = setup.querySelector('.setup-user-name');
  if ((evt.keyCode === ESC_KEYCODE) && (evt.target !== userNameInput)) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var setupPlayer = setup.querySelector('.setup-player');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

wizardCoat.addEventListener('click', function (evt) {
  
  console.log('oncoatclick');
  updateColorOfElement(evt.target, 'coat-color', COAT_COLORS);
});

wizardEyes.addEventListener('click', function (evt) {
  updateColorOfElement(evt.target, 'eyes-color', EYES_COLORS);
});

wizardFireball.addEventListener('click', function (evt) {
  updateColorOfElement(evt.target, 'fireball-color', FIREBALL_COLORS);
});

var setupSubmit = setup.querySelector('.setup-submit');
setupSubmit.addEventListener('click', function () {
  closePopup();
});

setupSubmit.addEventListener('keydown', function () {
  closePopup();
});

var dialogHandle = setup.querySelector('.setup-user-pic');
dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  console('mousedown')
  
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;
  
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    console.log('mousemove')
    
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    
    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };
  
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    console.log('mouseup')
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    
    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      }
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  };
  
  document.addEventListener('mousesmove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});



var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = createWizardsArray(WIZARDS_AMOUNT);

var fragment = document.createDocumentFragment();
for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  var wizardElement = createWizardElement(similarWizardTemplate, wizards[i]);
  fragment.appendChild(wizardElement);
}

similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');
