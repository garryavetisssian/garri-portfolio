/**
 * Meridian HR — Landing page interactions.
 * Vanilla JS, no frameworks. Smooth scrolling for anchor links is handled entirely by CSS
 * (`scroll-behavior: smooth` in landing.css) — this file owns three things CSS can't:
 * the mobile nav toggle, the Product Showcase tabs, and the scroll-reveal trigger.
 */
(function () {
  'use strict';

  function setupMobileNav() {
    var nav = document.getElementById('landing-nav');
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('landing-nav-links');
    if (!nav || !toggle || !links) return;

    function isOpen() { return nav.classList.contains('is-open'); }
    function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    function openMenu() { nav.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); }

    toggle.addEventListener('click', function () { isOpen() ? closeMenu() : openMenu(); });

    // Choosing a link closes the menu — otherwise it would still cover the page after the scroll.
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Escape closes the menu and returns focus to the toggle — standard accessible disclosure behavior.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  function setupShowcaseTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.showcase-tab'));
    if (!tabs.length) return;
    var allCards = document.querySelectorAll('.showcase-app__list .request-card');

    function activate(tab) {
      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', String(isActive));
        t.tabIndex = isActive ? 0 : -1;

        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !isActive;
          if (isActive) {
            // Remove then re-add the class (forcing a reflow in between) so the panel's fade-in
            // animation replays on every switch, not just the first time it appears.
            panel.classList.remove('is-active');
            void panel.offsetWidth;
            panel.classList.add('is-active');
          } else {
            panel.classList.remove('is-active');
          }
        }
      });

      // The request list stays visible across every tab (it's one mini app, not three separate
      // fragments) — only which card reads as "selected" changes, matching the detail shown.
      var targetCardId = tab.getAttribute('data-select-card');
      allCards.forEach(function (card) {
        card.classList.toggle('selected', card.id === targetCardId);
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { activate(tabs[(i + 1) % tabs.length]); tabs[(i + 1) % tabs.length].focus(); }
        if (e.key === 'ArrowLeft') { activate(tabs[(i - 1 + tabs.length) % tabs.length]); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
      });
    });
  }

  // Hero workflow sequence: cycles the three .hero-frame elements to show HR asking a question,
  // the employee replying, and the status flipping back to "With HR" — the same status-transition
  // logic 06_ui_design/app.js already implements on a real reply. Communicates the product's
  // actual behavior, not a decorative loop. Does not run at all under reduced motion — the first
  // frame (the current, most informative state) stays visible statically instead.
  function setupHeroSequence() {
    var frames = Array.prototype.slice.call(document.querySelectorAll('.hero-frame'));
    if (frames.length < 2) return;
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var index = 0;
    setInterval(function () {
      index = (index + 1) % frames.length;
      frames.forEach(function (frame, i) { frame.classList.toggle('is-active', i === index); });
    }, 3200);
  }

  // Subtle, single-fire reveal on scroll. Skipped entirely for reduced-motion users or browsers
  // without IntersectionObserver — .reveal's CSS fallback (opacity:1, no transform) covers both,
  // so content is never hidden if this doesn't run.
  function setupRevealAnimations() {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // Demo request modal — the actual destination for the primary "Book a Demo" CTA (Item #9).
  // Same accessible-disclosure shape as setupMobileNav above: Escape closes it, a backdrop click
  // closes it, and focus returns to whichever button opened it.
  function setupDemoModal() {
    var modal = document.getElementById('demo-modal');
    var form = document.getElementById('demo-form');
    var confirmation = document.getElementById('demo-confirmation');
    if (!modal || !form || !confirmation) return;
    var lastFocused = null;

    function isOpen() { return !modal.hidden; }

    function openModal(trigger) {
      lastFocused = trigger || document.activeElement;
      modal.hidden = false;
      var firstField = document.getElementById('demo-name');
      if (firstField) firstField.focus();
    }

    function closeModal() {
      modal.hidden = true;
      form.hidden = false;
      confirmation.hidden = true;
      form.reset();
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    document.querySelectorAll('[data-action="open-demo-modal"]').forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(btn); });
    });
    modal.querySelectorAll('[data-action="close-demo-modal"]').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) closeModal(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.hidden = true;
      confirmation.hidden = false;
      var doneBtn = confirmation.querySelector('button');
      if (doneBtn) doneBtn.focus();
    });
  }

  setupMobileNav();
  setupShowcaseTabs();
  setupRevealAnimations();
  setupHeroSequence();
  setupDemoModal();
})();
