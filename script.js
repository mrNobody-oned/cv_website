// Download as PDF simply triggers the browser's print dialog,
// styled by the @media print rules in style.css.
document.getElementById('print-btn')?.addEventListener('click', () => {
  window.print();
});

// Featured Projects scrollytelling: the photo runs the full width of the
// page. On desktop, scrolling (mouse wheel / trackpad) anywhere over the
// block — the photo or the timeline panel overlaid on its right edge —
// pages through the projects one at a time, crossfading the background
// and swapping the title/description. Once you're past the first or
// last project the scroll passes through to the page normally, so
// visitors are never trapped. On narrow screens the timeline drops to a
// normal block below the photo and paging is driven by ordinary page
// scroll instead.
(function initFeatureScroller() {
  const items = Array.from(document.querySelectorAll('.feature-timeline-item'));
  const scrollerEl = document.querySelector('.feature-scroller');
  const bgA = document.getElementById('feature-bg-a');
  const bgB = document.getElementById('feature-bg-b');
  const dateEl = document.getElementById('feature-date');
  const titleEl = document.getElementById('feature-title');
  const metaEl = document.getElementById('feature-meta');
  const descEl = document.getElementById('feature-desc');

  if (!items.length || !scrollerEl || !bgA || !bgB || !dateEl || !titleEl || !metaEl || !descEl) return;

  let showingA = true;
  let currentIndex = items.findIndex((item) => item.classList.contains('is-active'));
  if (currentIndex === -1) currentIndex = 0;

  function applyContent(item) {
    const { img, date, title, meta, desc } = item.dataset;
    dateEl.textContent = date || '';
    titleEl.textContent = title || '';
    metaEl.textContent = meta || '';
    descEl.textContent = desc || '';

    const nextLayer = showingA ? bgB : bgA;
    const prevLayer = showingA ? bgA : bgB;
    if (img) nextLayer.style.backgroundImage = `url('${img}')`;
    nextLayer.classList.add('is-visible');
    prevLayer.classList.remove('is-visible');
    showingA = !showingA;
  }

  function goToIndex(index) {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    if (clamped === currentIndex) return false;
    currentIndex = clamped;
    items.forEach((i, idx) => i.classList.toggle('is-active', idx === clamped));
    applyContent(items[clamped]);
    items[clamped].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    return true;
  }

  // Click or keyboard-activate a timeline entry to jump straight to it —
  // works in both the desktop overlay and the mobile stacked layout.
  items.forEach((item, idx) => {
    item.addEventListener('click', () => goToIndex(idx));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToIndex(idx);
      }
    });
  });

  const isOverlayLayout = () => window.matchMedia('(min-width: 861px)').matches;

  // --- Desktop: wheel scrolling over the block pages through projects ---
  const WHEEL_LOCK_MS = 550;
  let wheelLocked = false;

  function handleWheel(e) {
    const direction = e.deltaY > 0 ? 1 : -1;
    const targetIndex = currentIndex + direction;

    // At the first/last project, don't swallow the scroll — let the
    // page keep moving so visitors can scroll past the section.
    if (targetIndex < 0 || targetIndex > items.length - 1) return;

    e.preventDefault();
    if (wheelLocked) return;

    wheelLocked = true;
    goToIndex(targetIndex);
    setTimeout(() => {
      wheelLocked = false;
    }, WHEEL_LOCK_MS);
  }

  // --- Mobile/stacked layout: fall back to plain page-scroll detection ---
  let observer = null;

  function enableObserverMode() {
    if (observer || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            if (idx !== -1) goToIndex(idx);
          }
        });
      },
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    items.forEach((item) => observer.observe(item));
  }

  function disableObserverMode() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function enableWheelMode() {
    scrollerEl.addEventListener('wheel', handleWheel, { passive: false });
  }

  function disableWheelMode() {
    scrollerEl.removeEventListener('wheel', handleWheel);
  }

  function applyLayoutMode() {
    if (isOverlayLayout()) {
      disableObserverMode();
      enableWheelMode();
    } else {
      disableWheelMode();
      enableObserverMode();
    }
  }

  applyLayoutMode();

  // Re-evaluate which mode is active if the layout crosses the overlay
  // vs. stacked breakpoint (e.g. rotating a tablet).
  let lastLayout = isOverlayLayout();
  window.addEventListener('resize', () => {
    const nowLayout = isOverlayLayout();
    if (nowLayout !== lastLayout) {
      lastLayout = nowLayout;
      applyLayoutMode();
    }
  });
})();

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