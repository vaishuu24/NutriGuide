// =============================================
//  NutriGuiide — Main JS (Landing Page)
// =============================================

/* ---- Navbar scroll shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ---- Hamburger toggle ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.right = '24px';
  navLinks.style.background = '#ffffff';
  navLinks.style.borderRadius = '16px';
  navLinks.style.padding = '16px 24px';
  navLinks.style.boxShadow = '0 8px 32px rgba(78,205,196,0.18)';
  navLinks.style.gap = '12px';
  navLinks.style.zIndex = '999';
});

/* ---- IntersectionObserver scroll-reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger child items in the same parent grid
        const siblings = entry.target.closest('.how-grid, .plans-grid, .testimonials-grid');
        const delay = siblings
          ? Array.from(siblings.children).indexOf(entry.target) * 100
          : 0;
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback: show immediately
  revealEls.forEach(el => el.classList.add('in-view'));
}

/* ---- Smooth anchor scrolling ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Plan card hover tilt effect ---- */
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `translateY(-16px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
  });
});

/* ---- Stat counter animation ---- */
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = target >= 1000 ? (value / 1000).toFixed(0) + 'K+' : value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('50K')) animateCounter(el, 50000);
        if (text.includes('98')) { el.textContent = '0%'; animateCounter(el, 98, '%'); }
        if (text.includes('4.9')) { /* keep static for star rating */ }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
