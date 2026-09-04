// --- AUTOMATIC BACKGROUND MUSIC ENGINE ---
const music = document.getElementById('bg-music');

if (music) {
  music.volume = 0.15;

  music.play().catch(() => {
    // Autoplay blocked — retry on first user interaction
    const playOnInteraction = () => {
      if (music.paused) {
        music.volume = 0.15;
        music.play().catch(() => {});
      }
      window.removeEventListener('click', playOnInteraction);
      window.removeEventListener('touchstart', playOnInteraction);
    };
    window.addEventListener('click', playOnInteraction, { once: true });
    window.addEventListener('touchstart', playOnInteraction, { once: true });
  });
}


// --- SCROLL-TRIGGERED ANIMATIONS ---
document.addEventListener('DOMContentLoaded', () => {

  // Respect users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
      .forEach(el => el.classList.add('visible'));
    return;
  }

  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.15,  // trigger when 15% of element is visible
    rootMargin: '0px 0px -40px 0px' // slight offset so it triggers just before fully in view
  });

  animatedElements.forEach(el => observer.observe(el));

});
