// ═══════════════════════════════════
// LENIS — Smooth Scroll
// ═══════════════════════════════════

const lenis = new Lenis({
  lerp: 0.07,
  smoothWheel: true,
  wheelMultiplier: 0.8,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -60 });
    }
  });
});
