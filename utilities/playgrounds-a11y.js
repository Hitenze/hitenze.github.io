/* Shared accessibility helpers for the playgrounds (loaded after each app's own script).
   - Radio groups were mouse-only (inputs hidden with display:none, state driven by label clicks):
     the inputs are now focusable (visually hidden in playgrounds-theme.css); keyboard changes are
     forwarded to the label's existing click handler so the app state stays in sync.
   - Icon-only "−"/"+" spinner buttons get an accessible name from their section label. */
(function () {
  'use strict';
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var radios = document.querySelectorAll('.radio-group input[type="radio"]');
    Array.prototype.forEach.call(radios, function (r) {
      var lbl = r.closest('label');
      if (!lbl) return;
      if (lbl.classList.contains('checked')) r.checked = true;
      r.addEventListener('change', function () { if (r.checked) lbl.click(); });
    });
    // Keep inputs in sync when the app changes the .checked label class itself (presets, reset)
    Array.prototype.forEach.call(document.querySelectorAll('.radio-group'), function (g) {
      new MutationObserver(function () {
        Array.prototype.forEach.call(g.querySelectorAll('label'), function (l) {
          var i = l.querySelector('input[type="radio"]');
          if (i && l.classList.contains('checked') && !i.checked) i.checked = true;
        });
      }).observe(g, { subtree: true, attributes: true, attributeFilter: ['class'] });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.btn-spin, .btn-sm'), function (b) {
      if (b.getAttribute('aria-label')) return;
      var sec = b.closest('.sidebar-section, #network-top, .spin-row');
      var lab = sec && sec.parentNode ? (sec.querySelector('label') || (sec.closest('.sidebar-section') || sec).querySelector('label')) : null;
      var name = lab ? lab.textContent.trim() : '';
      var t = b.textContent.trim();
      var verb = (t === '+' ) ? 'Increase' : (t === '−' || t === '-') ? 'Decrease' : t;
      b.setAttribute('aria-label', name ? verb + ' ' + name : verb);
    });
  });
})();
