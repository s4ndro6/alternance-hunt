// ═══════════════════════════════════
// CURSOR — Custom Cursor with Lerp
// ═══════════════════════════════════

(() => {
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  if (isMobile) return;

  const el = document.getElementById("cursor");
  if (!el) return;

  let cx = 0,
    cy = 0,
    tx = 0,
    ty = 0;

  document.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  // State handlers
  document
    .querySelectorAll('[data-cursor="link"], a, button')
    .forEach((node) => {
      node.addEventListener("mouseenter", () => el.classList.add("is-link"));
      node.addEventListener("mouseleave", () => el.classList.remove("is-link"));
    });

  document
    .querySelectorAll(
      "p, .faq-a-in, .hero-sub, .glass-card p, .tl-body p, .feat p",
    )
    .forEach((node) => {
      node.addEventListener("mouseenter", () => el.classList.add("is-text"));
      node.addEventListener("mouseleave", () => el.classList.remove("is-text"));
    });

  function loop() {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.body.style.cursor = "none";
  document
    .querySelectorAll("a, button")
    .forEach((n) => (n.style.cursor = "none"));
})();
