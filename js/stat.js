'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
// Константы для гистограммы
var CHART_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLOR_YOUR_COLUMN = 'rgba(255, 0, 0, 1)';

var titleHeight = (FONT_GAP + GAP) * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getChartWidth = function (numberOfColumns) {
  return COLUMN_WIDTH * numberOfColumns + COLUMN_GAP * (numberOfColumns - 1);
};

var getMaxElement = function (arr) {
  var maxElement = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var roundElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = Math.round(arr[i]);
  }
  return arr;
};

var renderColumn = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderName = function (ctx, name, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillText(name, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = FONT_GAP + 'px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + FONT_GAP + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + (FONT_GAP + GAP) * 2);

  times = roundElements(times);
  var maxTime = getMaxElement(times);
  var gapOfChart = Math.round((CLOUD_WIDTH - getChartWidth(names.length)) / 2);

  for (var i = 0; i < names.length; i++) {
    var columnColor = 'rgba(0,0,255,' + Math.fround(Math.random()) + ')';

    if (names[i] === 'Вы') {
      columnColor = COLOR_YOUR_COLUMN;
    }

    var columnHeight = times[i] * CHART_HEIGHT / maxTime;
    var delta = CHART_HEIGHT - columnHeight;

    var columnX = CLOUD_X + gapOfChart + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var columnY = CLOUD_Y + titleHeight + GAP + delta;

    // нарисовать колонки
    renderColumn(ctx, columnColor, columnX, columnY, COLUMN_WIDTH, columnHeight);

    // заполнить имена
    var nameX = CLOUD_X + gapOfChart + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var nameY = CLOUD_Y + titleHeight + GAP + FONT_GAP + CHART_HEIGHT + GAP;
    renderName(ctx, names[i], '#000', nameX, nameY);
  }
};
