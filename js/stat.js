'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 10;
var CONTENT_GAP = 20;
var CONTENT_X = CLOUD_X + CONTENT_GAP;
var CONTENT_Y = CLOUD_Y + CONTENT_GAP;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;

var drawRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var setFontStyle = function (ctx, font, baseline, style) {
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillStyle = style;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomColorSaturation = function (hue, lightness) {
  var saturation = getRandomInt(100);
  var randomSaturation = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  return randomSaturation;
};

window.renderStatistics = function (ctx, names, times) {
  drawRectangle(
      ctx,
      CLOUD_X + SHADOW_GAP,
      CLOUD_Y + SHADOW_GAP,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      'rgb(0 0 0 /0.7)'
  );

  drawRectangle(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      'rgb(255 255 255)'
  );

  setFontStyle(
      ctx,
      '16px PT Mono',
      'hanging',
      'rgb(0 0 0)'
  );

  ctx.fillText(
      'Ура вы победили!',
      CONTENT_X,
      CONTENT_Y
  );

  ctx.fillText(
      'Список результатов:',
      CONTENT_X, CONTENT_Y + CONTENT_GAP
  );

  var maxTime = Math.max.apply(null, times);

  names.forEach(function (name, index) {
    var currentX = CONTENT_X + (BAR_WIDTH + TEXT_WIDTH) * index;
    var currenBarHeight = (BAR_MAX_HEIGHT * times[index]) / maxTime;
    var currentY = CLOUD_HEIGHT - CONTENT_GAP - GAP - currenBarHeight;
    var currentTime = Math.floor(times[index]);

    setFontStyle(
        ctx,
        '16px PT Mono',
        'hanging',
        'rgb(0 0 0)'
    );

    ctx.fillText(
        name,
        currentX,
        CLOUD_HEIGHT - CONTENT_GAP
    );

    ctx.fillText(
        currentTime,
        currentX,
        currentY - CONTENT_GAP
    );

    ctx.fillStyle = name === 'Вы' ? 'rgb(255 0 0)' : getRandomColorSaturation(240, 50);
    ctx.fillRect(
        currentX,
        currentY,
        BAR_WIDTH,
        currenBarHeight
    );
  });
};
