// ═══════════════════════════════════
// COUNTERS — Animated Numbers
// ═══════════════════════════════════

(() => {
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animate(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const start = performance.now();
    const item = el.closest(".stat-item");

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOutExpo(t) * target) + suffix;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
        el.classList.add("glow");
        if (item) item.classList.add("counted");
        setTimeout(() => el.classList.remove("glow"), 1500);
      }
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !e.target.classList.contains("glow")) {
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll("[data-count]").forEach((el) => obs.observe(el));
})();
