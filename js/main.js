/* =========================================================
   Workshop site — navbar state, mobile menu
   ========================================================= */

(function () {
  'use strict';

  var navbar   = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var links    = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];

  /* ---- Mobile menu ---- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Navbar shadow + active link while scrolling ---- */
  var sections = Array.prototype.map.call(links, function (link) {
    return document.querySelector(link.getAttribute('href'));
  });

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // The last section whose top has passed just below the navbar is "current".
    var mark = window.scrollY + navbar.offsetHeight + 40;
    var current = -1;
    sections.forEach(function (section, i) {
      if (section && section.offsetTop <= mark) current = i;
    });
    // At the very bottom, the last section counts even if it's short.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = sections.length - 1;
    }
    links.forEach(function (link, i) {
      link.classList.toggle('active', i === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());
