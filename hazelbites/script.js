/* =============================================
   HAZEL BITES – script.js
   - Navbar scroll effect
   - Product card hover / click
   - Smooth scroll
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. NAVBAR SCROLL SHADOW ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 24px rgba(74, 60, 49, 0.12)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  /* ---------- 2. ACTIVE NAV LINK (SCROLL SPY) ---------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-110px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  /* ---------- 3. PRODUCT / CATALOG CARD RIPPLE ---------- */
  const cards = document.querySelectorAll('.product-card, .catalog-card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Simple visual feedback
      card.style.transform = 'scale(0.97)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });

  /* ---------- 4. SEARCH INPUT FOCUS STYLE ---------- */
  const searchInput = document.querySelector('.navbar-search input');
  const searchWrap = document.querySelector('.navbar-search');

  if (searchInput && searchWrap) {
    searchInput.addEventListener('focus', () => {
      searchWrap.style.borderColor = '#C95160';
      searchWrap.style.boxShadow = '0 0 0 3px rgba(201, 81, 96, 0.15)';
    });
    searchInput.addEventListener('blur', () => {
      searchWrap.style.borderColor = '#4A3C31';
      searchWrap.style.boxShadow = 'none';
    });
  }

  /* ---------- 5. SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 6. CTA BUTTON WAVE ANIMATION ---------- */
  const ctaBtn = document.querySelector('.hero-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', () => {
      ctaBtn.style.letterSpacing = '0.5px';
    });
    ctaBtn.addEventListener('mouseleave', () => {
      ctaBtn.style.letterSpacing = '';
    });
  }

  /* ---------- 7. LAZY IMAGE FADE-IN ---------- */
  const images = document.querySelectorAll('img');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        imgObserver.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => { img.style.opacity = '1'; });
      imgObserver.observe(img);
    }
  });

  /* ---------- 8. HERO PARALLAX (subtle) ---------- */
  const heroBg = document.querySelector('.hero-bg-image img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 1200) {
        heroBg.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    }, { passive: true });
  }

});
