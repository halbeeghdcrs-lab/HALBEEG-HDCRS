/* ============================================================
   HALBEEG - Main JavaScript
   Smart interactions: scroll reveal, gallery, counters, form, nav
   Version 7.0 — Warm theme + working RFP endpoint
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

    if (navbar) {
      if (scrollY > 80) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    var backBtn = document.getElementById('backToTop');
    if (backBtn) {
      if (scrollY > 600) backBtn.classList.add('visible');
      else backBtn.classList.remove('visible');
    }

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
      if (href === '#' + currentSection) navLinks[j].classList.add('active');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

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
      if (elementTop < windowHeight - 80) el.classList.add('visible');
    }
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('resize', checkReveal);
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
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);
          counter.textContent = current;
          if (progress < 1) requestAnimationFrame(step);
          else counter.textContent = target;
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
        'background:rgba(184,134,11,' + (0.1 + Math.random() * 0.25) + ');' +
        'left:' + (Math.random() * 100) + '%;' +
        'top:' + (Math.random() * 100) + '%;' +
        'animation:float-particle ' + (6 + Math.random() * 8) + 's ease-in-out infinite ' + (Math.random() * 4) + 's;';
      particlesContainer.appendChild(dot);
    }

    var styleSheet = document.createElement('style');
    styleSheet.textContent =
      '@keyframes float-particle {' +
      '0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }' +
      '25% { transform: translate(' + (10 + Math.random() * 30) + 'px, -' + (20 + Math.random() * 40) + 'px) scale(1.3); opacity: 0.65; }' +
      '50% { transform: translate(-' + (15 + Math.random() * 20) + 'px, -' + (10 + Math.random() * 30) + 'px) scale(0.8); opacity: 0.45; }' +
      '75% { transform: translate(' + (5 + Math.random() * 25) + 'px, ' + (10 + Math.random() * 20) + 'px) scale(1.1); opacity: 0.55; }' +
      '}';
    document.head.appendChild(styleSheet);
  }

  // ========== GALLERY TABS ==========
  var galleryTabs = document.querySelectorAll('.gallery-tab');
  var galleryItems = document.querySelectorAll('.gallery-item');

  for (var t = 0; t < galleryTabs.length; t++) {
    galleryTabs[t].addEventListener('click', function () {
      for (var a = 0; a < galleryTabs.length; a++) galleryTabs[a].classList.remove('active');
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');
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
      var img = this.querySelector('.gallery-img img');

      var html = '';
      if (img && img.src) {
        html += '<div style="width:100%;border-radius:16px;margin-bottom:20px;overflow:hidden;background:#3D2E1A;">';
        html += '<img src="' + img.src + '" alt="' + (img.alt || '') + '" style="width:100%;height:auto;display:block;max-height:70vh;object-fit:contain;">';
        html += '</div>';
      } else {
        html += '<div style="width:100%;aspect-ratio:16/9;border-radius:16px;margin-bottom:20px;background:linear-gradient(135deg,#DCD0B4,#B8A67F);display:flex;align-items:center;justify-content:center;">';
        html += '<i class="fas fa-image" style="font-size:4rem;color:rgba(61,46,26,0.3);"></i>';
        html += '</div>';
      }
      if (cat) html += '<div style="margin-bottom:12px;font-family:Montserrat,sans-serif;font-size:0.7rem;font-weight:700;color:#D4A017;text-transform:uppercase;letter-spacing:2px;">' + cat.textContent + '</div>';
      if (title) html += '<h4>' + title.textContent + '</h4>';
      if (desc) html += '<p>' + desc.textContent + '</p>';

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

  // ========== INTAKE FORM (RFP) — V7.0 ==========
  var intakeForm = document.getElementById('intakeForm');
  var formMessage = document.getElementById('formMessage');
  var submitBtn = document.getElementById('submitBtn');

  // HDCRS backend (Code.gs V6.4). If the deployment URL changes again, update ONLY this line.
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyP6a_4bvB7qgPMEQYVMUiopSfYcI5JrsFHTb7tJjFkzVsQUJ6oolMiu9ZiroqRdYIU/exec';

  if (intakeForm) {
    intakeForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btnText = submitBtn.querySelector('.btn-text');
      var btnLoading = submitBtn.querySelector('.btn-loading');

      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;
      if (formMessage) formMessage.style.display = 'none';

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

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'submitInquiry', data: formData })
      })
        .then(function (res) { return res.text(); })
        .then(function (text) {
          var result;
          try { result = JSON.parse(text); }
          catch (e) {
            throw new Error('Server returned an unexpected response. Please try again or email us directly at abdirahman144@gmail.com.');
          }
          if (result.success) {
            showFormMessage(true, result.message || ('Thank you, ' + formData.repName + '. Your inquiry (' + (result.inquiryId || 'received') + ') has been recorded. We will respond within 2 business days.'));
            intakeForm.reset();
          } else {
            showFormMessage(false, result.message || 'Submission could not be completed. Please try again or email abdirahman144@gmail.com directly.');
          }
        })
        .catch(function (err) {
          showFormMessage(false, err.message || 'Network error. Please check your connection or email abdirahman144@gmail.com directly.');
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
