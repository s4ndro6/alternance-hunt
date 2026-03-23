// ═══════════════════════════════════════════
// GSAP ANIMATIONS — ScrollTrigger + Timeline
// ═══════════════════════════════════════════

(() => {
  gsap.registerPlugin(ScrollTrigger);
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

  // ── NAV ──
  ScrollTrigger.create({
    start: 50,
    onUpdate: (self) => {
      document
        .getElementById("nav")
        .classList.toggle("scrolled", self.scroll() > 50);
    },
  });

  // ── HERO ENTRANCE ──
  const heroTL = gsap.timeline({ delay: 0.3 });

  heroTL.to(".hero-badge", {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
  });

  heroTL.to(
    "h1 .word",
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power4.out",
    },
    "-=0.2",
  );

  heroTL.to(
    ".hero-sub",
    {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.3",
  );

  heroTL.to(
    ".hero-ctas",
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.4",
  );

  heroTL.to(
    ".hero-note",
    {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.3",
  );

  // ── PARALLAX MESH ──
  if (!isMobile) {
    gsap.to(".hero-mesh", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // ── SCROLL REVEALS ──
  document.querySelectorAll("[data-scroll-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });

  // ── SPLIT TEXT (chars) SCROLL REVEAL ──
  document.querySelectorAll('[data-split="chars"]').forEach((el) => {
    if (el.dataset.splitMobile === "true") {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      return;
    }
    const chars = el.querySelectorAll(".char");
    if (!chars.length) return;
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  // ── TIMELINE SVG DRAW ──
  const tlProgress = document.getElementById("tl-progress");
  if (tlProgress) {
    gsap.fromTo(
      tlProgress,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#timeline",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      },
    );
  }

  // ── TIMELINE DOTS ACTIVATION ──
  document.querySelectorAll(".tl-dot").forEach((dot, i) => {
    ScrollTrigger.create({
      trigger: dot.closest(".tl-step"),
      start: "top 60%",
      once: true,
      onEnter: () => dot.classList.add("active"),
    });
  });

  // ── 3D TILT + SPOTLIGHT ──
  if (!isMobile) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateX: -y * 5,
          rotateY: x * 5,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });

        card.style.setProperty("--mx", e.clientX - rect.left + "px");
        card.style.setProperty("--my", e.clientY - rect.top + "px");
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      });
    });
  }

  // ── FAQ ACCORDION ──
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-a");
      const inner = answer.querySelector(".faq-a-in");
      const isOpen = item.classList.contains("open");

      // Close all
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
        gsap.to(answer, {
          height: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
        gsap.to(btn.querySelector(".faq-icon"), {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });
})();
