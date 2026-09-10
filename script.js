// Download as PDF simply triggers the browser's print dialog,
// styled by the @media print rules in style.css.
document.getElementById('print-btn')?.addEventListener('click', () => {
  window.print();
});

// One subtle, orchestrated entrance for the hero content only —
// skipped entirely if the visitor prefers reduced motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) {
    heroInner.style.opacity = '0';
    heroInner.style.transform = 'translateY(12px)';
    heroInner.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroInner.style.opacity = '1';
        heroInner.style.transform = 'translateY(0)';
      });
    });
  }
}