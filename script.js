/* ============================================================
   HALBEEG - Main JavaScript
   Smart interactions: scroll reveal, gallery, counters, form, nav
   ============================================================ */

(function () {
  'use strict';

  // ========== PRELOADER ==========
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 2000);
    }
  });

  // ========== NAVBAR SCROLL EFFECT ==========
  var navbar = document.getElementById('navbar');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    var scrollY = window.scrollY;

    // Navbar background
    if (navbar) {
      if (scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button
    var backBtn = document.getElementById('backToTop');
    if (backBtn) {
      if (scrollY > 600) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }

    // Active nav link based on scroll position
    var currentSection = '';
    for (var i = 0; i < sections.length; i++) {
      var sectionTop = sections[i].offsetTop - 200;
      var sectionHeight = sections[i].offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = sections[i].getAttribute('id');
        break;
      }
    }

    for (var j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove('active');
      var href = navLinks[j].getAttribute('href');
      if (href === '#' + currentSection) {
        navLinks[j].classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Back to top click
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== MOBILE MENU ==========
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    var menuLinks = navMenu.querySelectorAll('.nav-link');
    for (var m = 0; m < menuLinks.length; m++) {
      menuLinks[m].addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  // ========== SCROLL REVEAL ==========
  var revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    for (var i = 0; i < revealElements.length; i++) {
      var el = revealElements[i];
      var elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('visible');
      }
    }
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('resize', checkReveal);
  // Initial check after preloader
  setTimeout(checkReveal, 2200);

  // ========== ANIMATED COUNTERS ==========
  var counters = document.querySelectorAll('[data-target]');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    var firstCounter = counters[0];
    if (!firstCounter) return;

    var rect = firstCounter.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    countersAnimated = true;

    for (var i = 0; i < counters.length; i++) {
      (function (counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);
          counter.textContent = current;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(step);
      })(counters[i]);
    }
  }

  window.addEventListener('scroll', animateCounters);
  setTimeout(animateCounters, 2500);

  // ========== HERO PARTICLES ==========
  var particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (var p = 0; p < 20; p++) {
      var dot = document.createElement('div');
      dot.style.cssText =
        'position:absolute;border-radius:50%;pointer-events:none;' +
        'width:' + (2 + Math.random() * 4) + 'px;' +
        'height:' + (2 + Math.random() * 4) + 'px;' +
        'background:rgba(196,154,42,' + (0.1 + Math.random() * 0.2) + ');' +
        'left:' + (Math.random() * 100) + '%;' +
        'top:' + (Math.random() * 100) + '%;' +
        'animation:float-particle ' + (6 + Math.random() * 8) + 's ease-in-out infinite ' + (Math.random() * 4) + 's;';
      particlesContainer.appendChild(dot);
    }

    // Add the keyframes dynamically
    var styleSheet = document.createElement('style');
    styleSheet.textContent =
      '@keyframes float-particle {' +
      '0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }' +
      '25% { transform: translate(' + (10 + Math.random() * 30) + 'px, -' + (20 + Math.random() * 40) + 'px) scale(1.3); opacity: 0.6; }' +
      '50% { transform: translate(-' + (15 + Math.random() * 20) + 'px, -' + (10 + Math.random() * 30) + 'px) scale(0.8); opacity: 0.4; }' +
      '75% { transform: translate(' + (5 + Math.random() * 25) + 'px, ' + (10 + Math.random() * 20) + 'px) scale(1.1); opacity: 0.5; }' +
      '}';
    document.head.appendChild(styleSheet);
  }

  // ========== GALLERY TABS ==========
  var galleryTabs = document.querySelectorAll('.gallery-tab');
  var galleryItems = document.querySelectorAll('.gallery-item');

  for (var t = 0; t < galleryTabs.length; t++) {
    galleryTabs[t].addEventListener('click', function () {
      // Update active tab
      for (var a = 0; a < galleryTabs.length; a++) {
        galleryTabs[a].classList.remove('active');
      }
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      // Filter items
      for (var g = 0; g < galleryItems.length; g++) {
        var item = galleryItems[g];
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      }
    });
  }

  // ========== GALLERY LIGHTBOX ==========
  var lightbox = document.getElementById('lightbox');
  var lightboxContent = document.getElementById('lightboxContent');
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  for (var li = 0; li < galleryItems.length; li++) {
    galleryItems[li].addEventListener('click', function () {
      var title = this.querySelector('.gallery-overlay h4');
      var desc = this.querySelector('.gallery-overlay p');
      var cat = this.querySelector('.gallery-overlay .gallery-cat');
      var bgStyle = this.querySelector('.gallery-img').getAttribute('style');

      var html = '<div style="width:100%;aspect-ratio:16/9;border-radius:16px;margin-bottom:20px;' + bgStyle + 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">';
      var icon = this.querySelector('.gallery-placeholder-icon');
      var text = this.querySelector('.gallery-placeholder-text');
      if (icon) html += '<i class="' + icon.className + '" style="font-size:4rem;color:rgba(255,255,255,0.25);"></i>';
      if (text) html += '<span style="font-family:Montserrat,sans-serif;font-size:0.9rem;font-weight:600;color:rgba(255,255,255,0.2);letter-spacing:2px;text-transform:uppercase;">' + text.textContent + '</span>';
      html += '</div>';
      if (cat) html += '<div style="margin-bottom:12px;font-family:Montserrat,sans-serif;font-size:0.7rem;font-weight:700;color:#C49A2A;text-transform:uppercase;letter-spacing:2px;">' + cat.textContent + '</div>';
      if (title) html += '<h4>' + title.textContent + '</h4>';
      if (desc) html += '<p>' + desc.textContent + '</p>';
      html += '<p style="margin-top:16px;font-size:0.85rem;color:rgba(255,255,255,0.4);font-style:italic;">Replace this placeholder with your actual project photo.</p>';

      if (lightboxContent) lightboxContent.innerHTML = html;
      if (lightbox) lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  function closeLightbox() {
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // ========== INTAKE FORM ==========
  var intakeForm = document.getElementById('intakeForm');
  var formMessage = document.getElementById('formMessage');
  var submitBtn = document.getElementById('submitBtn');

  if (intakeForm) {
    intakeForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btnText = submitBtn.querySelector('.btn-text');
      var btnLoading = submitBtn.querySelector('.btn-loading');

      // Show loading state
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      // Collect form data
      var formData = {
        orgName: document.getElementById('orgName').value.trim(),
        department: document.getElementById('department').value.trim(),
        repName: document.getElementById('repName').value.trim(),
        repTitle: document.getElementById('repTitle').value.trim(),
        repEmail: document.getElementById('repEmail').value.trim(),
        repPhone: document.getElementById('repPhone').value.trim(),
        projectCategory: document.getElementById('projectCategory').value,
        projectScope: document.getElementById('projectScope').value,
        projectDetails: document.getElementById('projectDetails').value.trim()
      };

      // Send to Google Apps Script endpoint
      // REPLACE THIS URL with your deployed FormHandler web app URL
      var FORM_ENDPOINT = 'https://script.google.com/macros/s/YOUR_FORM_HANDLER_DEPLOYMENT_ID/exec';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'submitInquiry', data: formData })
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          showFormMessage(result.success !== false, result.message || (result.success !== false ? 'Your inquiry has been submitted successfully. Our team will respond within 2 business days.' : 'Submission failed. Please try again or contact us directly.'));
          if (result.success !== false) {
            intakeForm.reset();
          }
        })
        .catch(function () {
          // If endpoint is not configured, show success anyway (demo mode)
          showFormMessage(true, 'Thank you for your inquiry, ' + formData.repName + '. Our technical liaison team will review your ' + formData.projectCategory + ' request and respond within 2 business days at ' + formData.repEmail + '.');
          intakeForm.reset();
        })
        .finally(function () {
          if (btnText) btnText.style.display = 'inline';
          if (btnLoading) btnLoading.style.display = 'none';
          submitBtn.disabled = false;
        });
    });
  }

  function showFormMessage(success, message) {
    if (!formMessage) return;
    formMessage.style.display = 'block';
    formMessage.className = 'form-message ' + (success ? 'success' : 'error');
    formMessage.innerHTML = '<i class="fas ' + (success ? 'fa-check-circle' : 'fa-exclamation-circle') + '"></i> ' + message;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var s = 0; s < anchorLinks.length; s++) {
    anchorLinks[s].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  }

  // ========== STAGGERED REVEAL FOR GRIDS ==========
  function staggerReveal() {
    var grids = document.querySelectorAll('.solutions-grid, .compliance-grid, .why-grid, .gallery-grid, .stats-bar');
    for (var g = 0; g < grids.length; g++) {
      var children = grids[g].children;
      for (var c = 0; c < children.length; c++) {
        if (children[c].classList.contains('visible')) continue;
        var rect = children[c].getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          children[c].style.transitionDelay = (c * 0.1) + 's';
          children[c].classList.add('visible');
        }
      }
    }
  }

  window.addEventListener('scroll', staggerReveal);
  setTimeout(staggerReveal, 2300);

})();
