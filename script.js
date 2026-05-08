/* ============================================================
   ETHAN BRAZEAU PORTFOLIO — script.js
============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     HELPERS
  ---------------------------------------------------------- */
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.from((scope || document).querySelectorAll(selector));
  }

  /* ----------------------------------------------------------
     STICKY HEADER — adds .scrolled class after scrolling 40px
  ---------------------------------------------------------- */
  var header = qs('#site-header');

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run on load in case page is already scrolled

  /* ----------------------------------------------------------
     MOBILE NAVIGATION — hamburger toggle
  ---------------------------------------------------------- */
  var hamburger = qs('#hamburger');
  var navLinks  = qs('#nav-links');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a nav link is clicked
  qsa('#nav-links a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close menu if clicking outside the nav area
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ----------------------------------------------------------
     ACTIVE NAV LINK — highlights current section in nav
  ---------------------------------------------------------- */
  var sections = qsa('main section[id]');
  var navItems = qsa('.nav-links a');

  function setActiveNav() {
    var scrollPos = window.scrollY + 100;
    var current   = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ----------------------------------------------------------
     SCROLL REVEAL — fades in sections as they enter viewport
  ---------------------------------------------------------- */
  var revealTargets = qsa('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver isn't supported
    revealTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     PROJECT FILTER — filters cards by category
  ---------------------------------------------------------- */
  var filterBtns = qsa('.filter-btn');
  var projectCards = qsa('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Show/hide cards
      projectCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ----------------------------------------------------------
     APPLY REVEAL CLASSES — adds .reveal to section content
     so we don't have to add it manually to every element
  ---------------------------------------------------------- */
  function applyRevealClasses() {
    // Timeline items
    qsa('.timeline-item').forEach(function (el) {
      el.classList.add('reveal');
    });

    // Skill groups (staggered)
    var skillsGrid = qs('.skills-grid');
    if (skillsGrid) {
      skillsGrid.classList.add('reveal-stagger');
    }

    // About grid
    var aboutGrid = qs('.about-grid');
    if (aboutGrid) {
      aboutGrid.classList.add('reveal');
    }

    // Section headers
    qsa('.section-header').forEach(function (el) {
      el.classList.add('reveal');
    });

    // Experience card
    qsa('.experience-card').forEach(function (el) {
      el.classList.add('reveal');
    });

    // Project cards (stagger)
    var projectsGrid = qs('.projects-grid');
    if (projectsGrid) {
      projectsGrid.classList.add('reveal-stagger');
    }

    // Contact grid
    var contactGrid = qs('.contact-grid');
    if (contactGrid) {
      contactGrid.classList.add('reveal');
    }
  }

  // Apply before the observer runs
  applyRevealClasses();

  // Re-observe newly classified elements
  if ('IntersectionObserver' in window) {
    qsa('.reveal, .reveal-stagger').forEach(function (el) {
      // Only observe if not already visible
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  } else {
    qsa('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
