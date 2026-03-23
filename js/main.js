(() => {
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

  // ── NAV ──
  const nav = document.getElementById("nav");
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", scrollY > 50);
    },
    { passive: true },
  );

  // ── CUSTOM CURSOR ──
  if (!isMobile) {
    const cursor = document.getElementById("cursor");
    let cx = 0,
      cy = 0,
      tx = 0,
      ty = 0,
      scale = 1,
      tScale = 1;

    document.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    const growEls = document.querySelectorAll(
      '[data-cursor="grow"], a, button',
    );
    growEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        tScale = 2.5;
        cursor.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        tScale = 1;
        cursor.classList.remove("hover");
      });
    });

    function cursorLoop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      scale += (tScale - scale) * 0.15;
      cursor.style.transform = `translate(${cx}px, ${cy}px) scale(${scale})`;
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();
    document.body.style.cursor = "none";
    document
      .querySelectorAll("a, button")
      .forEach((el) => (el.style.cursor = "none"));
  }

  // ── SCROLL REVEAL ──
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.delay || 0, 10);
          setTimeout(() => e.target.classList.add("vis"), delay);
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  // ── 3D TILT ──
  if (!isMobile) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(10px)`;
        // Dynamic shadow
        const sx = -x * 20,
          sy = -y * 20;
        card.style.boxShadow = `${sx}px ${sy}px 40px rgba(0,0,0,.25), 0 0 20px rgba(16,185,129,.05)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });
  }

  // ── TEXT SPLIT ANIMATION ──
  document.querySelectorAll("[data-split]").forEach((el) => {
    const lines = el.querySelectorAll(".split-line");
    lines.forEach((line, li) => {
      const text = line.innerHTML;
      const words = text.split(/(\s+)/);
      line.innerHTML = words
        .map((w, i) => {
          if (w.trim() === "") return w;
          const delay = (li * 5 + i) * 60 + 200;
          return `<span class="word" style="animation-delay:${delay}ms">${w}</span>`;
        })
        .join("");
    });
  });

  // ── TYPEWRITER ──
  document.querySelectorAll("[data-typewriter]").forEach((el) => {
    const text = el.dataset.typewriter;
    el.textContent = "";
    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(interval);
      }, 35);
    }, 800);
  });

  // ── TIMELINE DRAW ──
  const tlPath = document.getElementById("timeline-path");
  if (tlPath) {
    const length = tlPath.getTotalLength
      ? tlPath.getTotalLength()
      : parseFloat(tlPath.getAttribute("y2")) -
        parseFloat(tlPath.getAttribute("y1"));
    tlPath.style.strokeDasharray = length;
    tlPath.style.strokeDashoffset = length;

    function updateTimeline() {
      const section = document.querySelector(".timeline");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (rect.height + vh * 0.3)),
      );
      tlPath.style.strokeDashoffset = length * (1 - progress);
    }
    window.addEventListener("scroll", updateTimeline, { passive: true });
    updateTimeline();
  }

  // ── FAQ ACCORDION ──
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-a");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-a").style.maxHeight = "0";
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ── PARALLAX ──
  if (!isMobile) {
    const meshEl = document.querySelector(".hero-mesh");
    window.addEventListener(
      "scroll",
      () => {
        if (meshEl) meshEl.style.transform = `translateY(${scrollY * 0.3}px)`;
      },
      { passive: true },
    );
  }
})();
