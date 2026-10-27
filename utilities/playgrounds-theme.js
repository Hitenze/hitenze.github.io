/* Shared colours for the playgrounds' canvases (loaded in <head>, before each app's own script).
   Canvas drawing cannot use CSS custom properties directly, so the apps read the site tokens
   (assets/css/tokens.css) through PG.c('<token>') at draw time. The site's theme toggle
   (assets/js/site.js) dispatches 'site-themechange'; the cache is cleared and every redraw function
   registered with PG.onTheme() runs again, so the charts follow the theme.
   Exception: the CNN's drawing pad and digit images stay black/white, because those pixels are the
   model's input data, not decoration. */
(function () {
  'use strict';
  var cache = {};
  var redraws = [];

  function token(name) {
    if (!(name in cache)) {
      cache[name] = getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim();
    }
    return cache[name];
  }
  function rgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function lum(c) {
    var v = c.map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }

  window.PG = {
    /* Token value, e.g. PG.c('ink'), PG.c('data-blue'). */
    c: token,
    /* Token with alpha, e.g. PG.a('data-blue', 0.5). */
    a: function (name, alpha) {
      var c = rgb(token(name));
      return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')';
    },
    /* Blend of two tokens, t = 0 gives a, t = 1 gives b (heatmap ramps). */
    mix: function (a, b, t) {
      var x = rgb(token(a)), y = rgb(token(b));
      return 'rgb(' + x.map(function (v, i) { return Math.round(v + (y[i] - v) * t); }).join(',') + ')';
    },
    /* 'ink' or 'paper', whichever reads better on a blend of tokens a and b at t. */
    textOn: function (a, b, t) {
      var x = rgb(token(a)), y = rgb(token(b));
      var bg = lum(x.map(function (v, i) { return Math.round(v + (y[i] - v) * t); }));
      var ink = lum(rgb(token('ink'))), paper = lum(rgb(token('paper')));
      var cInk = (Math.max(bg, ink) + 0.05) / (Math.min(bg, ink) + 0.05);
      var cPaper = (Math.max(bg, paper) + 0.05) / (Math.min(bg, paper) + 0.05);
      return token(cInk >= cPaper ? 'ink' : 'paper');
    },
    onTheme: function (fn) { redraws.push(fn); }
  };

  document.addEventListener('site-themechange', function () {
    cache = {};
    redraws.forEach(function (fn) { try { fn(); } catch (e) { if (window.console) console.error(e); } });
  });
})();
