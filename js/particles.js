// ═══════════════════════════════════
// PARTICLES — Canvas 2D Network
// ═══════════════════════════════════

(() => {
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  const canvas = document.getElementById("particle-canvas");
  if (!canvas || isMobile) return;

  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [];
  const mouse = { x: -9999, y: -9999 };
  const COUNT = 80;
  const CONNECT = 130;
  const MOUSE_R = 150;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }

  class P {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.5 + 1;
      this.a = Math.random() * 0.35 + 0.15;
    }
    update() {
      const dx = this.x - mouse.x,
        dy = this.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_R && d > 0) {
        const f = ((MOUSE_R - d) / MOUSE_R) * 0.6;
        this.vx += (dx / d) * f;
        this.vy += (dy / d) * f;
      }
      this.vx *= 0.985;
      this.vy *= 0.985;
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.a})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new P());
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / CONNECT) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(frame);
  }

  canvas.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  init();
  frame();
})();
