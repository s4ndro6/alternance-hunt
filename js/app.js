// ═══════════════════════════════════════════
// ALTERNANCE HUNT — APP.JS (consolidated)
// ═══════════════════════════════════════════

// ── PRODUCT SKILLS DATA ──
const PRODUCT_SKILLS = [
  {
    icon: "ph-bold ph-magnifying-glass",
    title: "Multi-plateformes",
    desc: "LBA, France Travail, Indeed, WTTJ, LinkedIn — toutes les offres centralisees, rien de rate.",
  },
  {
    icon: "ph-bold ph-brain",
    title: "IA personnalisee",
    desc: "Chaque lettre cite des elements specifiques de l'offre. Jamais du copie-colle.",
  },
  {
    icon: "ph-bold ph-bank",
    title: "API officielle gov",
    desc: "Candidatures via l'API La Bonne Alternance — legal, tracable, reconnu par les entreprises.",
  },
  {
    icon: "ph-bold ph-lightning",
    title: "Envoi automatique",
    desc: "Le systeme scrape, filtre, redige et envoie. Toi tu dors, lui il bosse.",
  },
  {
    icon: "ph-bold ph-funnel",
    title: "Filtres avances",
    desc: "Ville, domaine, type de contrat, mots-cles a exclure. Zero offre hors-sujet.",
  },
  {
    icon: "ph-bold ph-chart-bar",
    title: "Dashboard temps reel",
    desc: "Toutes tes candidatures centralisees : envoyee, vue, reponse recue.",
  },
  {
    icon: "ph-bold ph-file-text",
    title: "Analyse CV / ATS",
    desc: "Scan ATS avant envoi — tu sais ce qui bloque les recruteurs avant qu'ils te lisent.",
  },
  {
    icon: "ph-bold ph-clock",
    title: "Actif 24h/24",
    desc: "Une offre publiee le lundi matin ? Elle est dans ta pile a 8h01.",
  },
];

// ── RENDER SKILLS ──
function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCT_SKILLS.map(
    (s) => `
    <div class="skill-card" data-aos="fade-up">
      <div class="skill-icon">
        <i class="${s.icon}"></i>
      </div>
      <h3 class="skill-title">${s.title}</h3>
      <p class="skill-desc">${s.desc}</p>
    </div>
  `,
  ).join("");
}

// ── COUNTUP ON STATS ──
function initCountUp() {
  const stats = [
    { el: document.getElementById("stat-total"), target: 320, suffix: "+" },
    { el: document.getElementById("stat-api"), target: 94, suffix: "" },
    { el: document.getElementById("stat-email"), target: 226, suffix: "" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = stats.find((s) => s.el === entry.target);
          if (stat && stat.el) {
            const cu = new countUp.CountUp(stat.el, stat.target, {
              duration: 2,
              suffix: stat.suffix,
              useEasing: true,
              useGrouping: false,
            });
            if (!cu.error) cu.start();
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  stats.forEach((s) => {
    if (s.el) observer.observe(s.el);
  });
}

// ── PARTICLES — Canvas 2D Network ──
function initParticles() {
  const PARTICLE_COUNT = window.innerWidth < 768 ? 0 : 35;
  const canvas = document.getElementById("particle-canvas");

  if (!canvas || PARTICLE_COUNT === 0) {
    if (canvas) canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [];
  const mouse = { x: -9999, y: -9999 };
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
      ctx.fillStyle = `rgba(232, 255, 71, ${this.a * 0.4})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new P());
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
          ctx.strokeStyle = `rgba(232, 255, 71, ${(1 - d / CONNECT) * 0.05})`;
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
}

// ── LENIS SMOOTH SCROLL ──
function initLenis() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  if (typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

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
}

// ── HAMBURGER NAV ──
function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const navOverlay = document.querySelector(".nav-overlay");
  if (!hamburger || !navOverlay) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navOverlay.classList.toggle("open");
    document.body.style.overflow = navOverlay.classList.contains("open")
      ? "hidden"
      : "";
  });

  navOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navOverlay.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ── NAVBAR SCROLL EFFECT ──
function initNavScroll() {
  window.addEventListener("scroll", () => {
    document
      .querySelector(".navbar")
      ?.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ── GSAP ANIMATIONS ──
function initGSAP() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;
  gsap.registerPlugin(ScrollTrigger);

  // FAQ Accordion
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-a");
      const inner = answer.querySelector(".faq-a-in");
      const isOpen = item.classList.contains("open");

      // Close all others
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          gsap.to(openItem.querySelector(".faq-a"), {
            height: 0,
            duration: 0.4,
            ease: "power3.inOut",
          });
          gsap.to(openItem.querySelector(".faq-icon"), {
            rotate: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      if (!isOpen) {
        item.classList.add("open");
        gsap.to(answer, {
          height: inner.offsetHeight,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
        gsap.to(btn.querySelector(".faq-icon"), {
          rotate: 45,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        item.classList.remove("open");
        gsap.to(answer, { height: 0, duration: 0.4, ease: "power3.inOut" });
        gsap.to(btn.querySelector(".faq-icon"), {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });
}

// ── AOS INIT ──
function initAOS() {
  if (typeof AOS === "undefined") return;
  AOS.init({
    duration: 600,
    once: true,
    offset: 60,
    easing: "ease-out-cubic",
    disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });
}

// ── BOOT ──
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  initHamburger();
  initNavScroll();
  initParticles();
  initLenis();
  initAOS();
  initCountUp();
  initGSAP();
});
