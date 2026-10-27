/* Shared site script (deferred). Every block is optional: it only runs when its markup exists.
   All content is visible without this script; it adds the theme toggle, the phone menu, keyboard
   handling for the "More" menu, email buttons and the publications topic filter. */
(function () {
  'use strict';
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function stored() {
    try { var t = localStorage.getItem('theme'); return (t === 'dark-mode' || t === 'light-mode') ? t : null; } catch (e) { return null; }
  }
  function isDark() {
    return root.classList.contains('dark-mode') ||
      (!root.classList.contains('light-mode') && !!(mq && mq.matches));
  }
  function syncAttr() { root.setAttribute('data-theme', isDark() ? 'dark' : 'light'); }

  /* ---------- Theme ---------- */
  var toggles = document.querySelectorAll('.js-theme-toggle');
  var stateEl = document.getElementById('theme-state');
  function syncState() {
    if (stateEl) stateEl.textContent = isDark() ? 'Current theme: dark' : 'Current theme: light';
    for (var i = 0; i < toggles.length; i++) toggles[i].setAttribute('aria-pressed', isDark() ? 'true' : 'false');
  }
  for (var ti = 0; ti < toggles.length; ti++) {
    toggles[ti].addEventListener('click', function () {
      var next = isDark() ? 'light-mode' : 'dark-mode';
      root.classList.remove('light-mode', 'dark-mode');
      root.classList.add(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncAttr();
      syncState();
      document.dispatchEvent(new CustomEvent('site-themechange', { detail: { dark: isDark() } }));
    });
  }
  if (mq) {
    var onSys = function () {
      if (!stored()) { syncAttr(); document.dispatchEvent(new CustomEvent('site-themechange', { detail: { dark: isDark() } })); }
      syncState();
    };
    if (mq.addEventListener) mq.addEventListener('change', onSys);
    else if (mq.addListener) mq.addListener(onSys);
  }
  syncAttr();
  syncState();
  if (stateEl) stateEl.setAttribute('aria-live', 'polite');
  if (toggles.length) root.classList.add('theme-ready');

  /* ---------- Email ----------
     Addresses exist only in "(at)/(dot)" form, also after this script runs. With JS the text
     becomes a button; the real address is assembled on activation and handed straight to the
     browser, never written into the page. */
  var spans = document.querySelectorAll('span.email');
  for (var ei = 0; ei < spans.length; ei++) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'email';
    while (spans[ei].firstChild) btn.appendChild(spans[ei].firstChild);
    var hint = document.createElement('span');
    hint.className = 'sr-only';
    hint.textContent = ' (opens your email app)';
    btn.appendChild(hint);
    btn.addEventListener('click', function () {
      var t = this.querySelector('.addr').textContent;
      var scheme = 'mail' + 'to:';
      window.location.href = scheme + t.replace(/\s*\(at\)\s*/g, '@').replace(/\s*\(dot\)\s*/g, '.');
    });
    spans[ei].parentNode.replaceChild(btn, spans[ei]);
  }

  /* ---------- Navigation ---------- */
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  var more = nav ? nav.querySelector('.more > details') : null;

  function moreLinks() { return more ? Array.prototype.slice.call(more.querySelectorAll('.more-panel a')) : []; }
  function menuMode() { return !!menuBtn && getComputedStyle(menuBtn).display !== 'none'; }
  var wasMenu = false;
  function syncMore() {
    // In menu mode the "More" items are shown as a labelled group, so the disclosure stays open.
    if (!more) return;
    var m = menuMode();
    if (m) more.open = true;
    else if (wasMenu) more.open = false;
    wasMenu = m;
  }

  if (more) {
    var summary = more.querySelector('summary');
    summary.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation(); // the panel's own ArrowDown handler would otherwise move on to the 2nd link
        more.open = true;
        var l = moreLinks(); if (l[0]) l[0].focus();
      }
    });
    more.addEventListener('keydown', function (e) {
      var l = moreLinks();
      var i = l.indexOf(document.activeElement);
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && i >= 0) {
        e.preventDefault();
        l[(i + (e.key === 'ArrowDown' ? 1 : l.length - 1)) % l.length].focus();
      }
      if (e.key === 'Escape' && more.open && !menuMode()) {
        e.stopPropagation();
        more.open = false;
        summary.focus();
      }
    });
    document.addEventListener('pointerdown', function (e) {
      if (more.open && !menuMode() && !more.contains(e.target)) more.open = false;
    });
    more.addEventListener('focusout', function (e) {
      if (more.open && !menuMode() && e.relatedTarget && !more.contains(e.relatedTarget)) more.open = false;
    });
  }

  if (menuBtn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menuBtn.addEventListener('click', function () {
      setOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && menuMode()) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        menuBtn.focus();
      }
    });
    root.classList.add('menu-ready');

    // At >=56em the nav is inline. If it would wrap (enlarged text on a narrow desktop/tablet),
    // collapse to the Menu button instead; measured and decided in the same frame.
    var wide = window.matchMedia('(min-width: 56em)');
    var brand = document.querySelector('.brand');
    var bar = document.querySelector('.site-header .wrap');
    var fitNav = function () {
      var was = root.classList.contains('nav-collapsed');
      root.classList.remove('nav-collapsed');
      var collapse = false;
      if (wide.matches) {
        var lis = nav.querySelectorAll('.site-nav > ul > li');
        var ul = nav.querySelector('ul');
        var first = lis[0].getBoundingClientRect(), last = lis[lis.length - 1].getBoundingClientRect();
        var bs = getComputedStyle(brand);
        var lh = parseFloat(bs.lineHeight) || 0;
        var brandText = brand.getBoundingClientRect().height - parseFloat(bs.paddingTop) - parseFloat(bs.paddingBottom);
        collapse = Math.abs(last.top - first.top) > 1 ||
          ul.scrollWidth > ul.clientWidth + 1 ||
          bar.scrollWidth > bar.clientWidth + 1 ||
          (lh > 0 && brandText > lh * 1.5);
      }
      if (collapse) root.classList.add('nav-collapsed');
      else if (was) setOpen(false);
      if (!menuMode()) setOpen(false);
      syncMore();
    };
    fitNav();
    window.addEventListener('resize', fitNav);
    if (wide.addEventListener) wide.addEventListener('change', fitNav);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNav);
    if (window.ResizeObserver && brand) new ResizeObserver(function () { fitNav(); }).observe(brand);
  }

  /* ---------- Publications topic filter ---------- */
  var filter = document.getElementById('pub-filter');
  if (filter) {
    var buttons = Array.prototype.slice.call(filter.querySelectorAll('button[data-filter]'));
    var pubs = document.querySelectorAll('.pub');
    var groups = document.querySelectorAll('.pub-group');
    var status = document.getElementById('pub-status');
    var valid = buttons.map(function (b) { return b.getAttribute('data-filter'); });
    var apply = function (f, push) {
      var shown = 0;
      for (var i = 0; i < pubs.length; i++) {
        var cats = (pubs[i].getAttribute('data-category') || '').split(/\s+/);
        var on = f === 'all' || cats.indexOf(f) >= 0;
        pubs[i].hidden = !on;
        if (on) shown++;
      }
      for (var g = 0; g < groups.length; g++) groups[g].hidden = !groups[g].querySelector('.pub:not([hidden])');
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === f ? 'true' : 'false'); });
      if (status) status.textContent = f === 'all' ? 'Showing all ' + shown + ' publications.' : 'Showing ' + shown + ' of ' + pubs.length + ' publications.';
      if (push) {
        var url = new URL(window.location.href);
        if (f === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', f);
        window.history.replaceState({}, '', url);
      }
    };
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter'), true); });
    });
    var param = new URLSearchParams(window.location.search).get('filter');
    filter.hidden = false;
    apply(param && valid.indexOf(param) >= 0 ? param : 'all', false);
  }
})();
