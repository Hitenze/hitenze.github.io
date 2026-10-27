/* Shared colours for the playgrounds' canvases (loaded in <head>, before each app's own script).
   Canvas drawing cannot use CSS custom properties directly, so the apps read the site tokens
   (assets/css/tokens.css) through PG.c('<token>') at draw time. The site's theme toggle
   (assets/js/site.js) dispatches 'site-themechange'; the cache is cleared and every redraw function
   registered with PG.onTheme() runs again, so the charts follow the theme.
   Exception: the CNN's drawing pad and digit images stay black/white, because those pixels are the
   model's input data, not decoration (its feature maps and kernels do use the tokens). */
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
    /* Token as an [r, g, b] array, for ImageData ramps. */
    rgb: function (name) { return rgb(token(name)); },
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
    /* Text colour for a blend of tokens a and b at t: 'ink' or 'paper', whichever reads better, as
       long as it reaches 4.6:1 (a small margin over 4.5:1 for rounding). In the middle of a ramp
       neither token may get there; then black or white is used, one of which always gives at least
       4.58:1. */
    textOn: function (a, b, t) {
      var x = rgb(token(a)), y = rgb(token(b));
      var bg = lum(x.map(function (v, i) { return Math.round(v + (y[i] - v) * t); }));
      function cr(l) { return (Math.max(bg, l) + 0.05) / (Math.min(bg, l) + 0.05); }
      var cInk = cr(lum(rgb(token('ink')))), cPaper = cr(lum(rgb(token('paper'))));
      if (Math.max(cInk, cPaper) >= 4.6) return token(cInk >= cPaper ? 'ink' : 'paper');
      return cr(0) >= cr(1) ? '#000' : '#fff';
    },
    onTheme: function (fn) { redraws.push(fn); }
  };

  document.addEventListener('site-themechange', function () {
    cache = {};
    redraws.forEach(function (fn) { try { fn(); } catch (e) { if (window.console) console.error(e); } });
  });
})();
