'use strict';

(function () {
  var getRandomColorSaturation = window.color.getRandomSaturation;

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_COLOR = 'rgb(255, 255, 255)';
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var SHADOW_GAP = 10;
  var GAP = 10;
  var CONTENT_GAP = 20;
  var CONTENT_X = CLOUD_X + CONTENT_GAP;
  var CONTENT_Y = CLOUD_Y + CONTENT_GAP;
  var CLOUD_TEXT = 'Ура вы победили!\nСписок результатов:';
  var TEXT_WIDTH = 50;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;

  var drawCloud = function (ctx, x, y, width, height) {
    ctx.fillStyle = CLOUD_COLOR;
    ctx.shadowColor = SHADOW_COLOR;
    ctx.shadowOffsetX = SHADOW_GAP;
    ctx.shadowOffsetY = SHADOW_GAP;
    ctx.fillRect(x, y, width, height);
    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
  };

  var setFontStyle = function (ctx, font, baseline, style) {
    ctx.font = font;
    ctx.textBaseline = baseline;
    ctx.fillStyle = style;
  };

  var drawHistogram = function (ctx, names, times) {
    var maxTime = Math.max.apply(null, times);

    names.forEach(function (name, index) {
      var time = Math.floor(times[index]);
      var barX = CONTENT_X + (BAR_WIDTH + TEXT_WIDTH) * index;
      var barHeight = (BAR_MAX_HEIGHT * time) / maxTime;
      var barY = CLOUD_HEIGHT - CONTENT_GAP - GAP - barHeight;

      setFontStyle(ctx, '16px PT Mono', 'hanging', 'rgb(0, 0, 0)');
      ctx.fillText(name, barX, CLOUD_HEIGHT - CONTENT_GAP);
      ctx.fillText(time, barX, barY - CONTENT_GAP);

      ctx.fillStyle = name === 'Вы' ?
        'rgb(255, 0, 0)' :
        getRandomColorSaturation(240, 50);

      ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    });
  };

  var renderStatistics = function (ctx, names, times) {
    drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    setFontStyle(ctx, '16px PT Mono', 'hanging', 'rgb(0, 0, 0)');

    CLOUD_TEXT.split('\n').forEach(function (text, index) {
      ctx.fillText(text, CONTENT_X, CONTENT_Y + CONTENT_GAP * index);
    });

    drawHistogram(ctx, names, times);
  };

  window.renderStatistics = renderStatistics;
})();
