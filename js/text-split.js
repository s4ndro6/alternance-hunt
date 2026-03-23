// ═══════════════════════════════════
// TEXT SPLIT — Prepare DOM for GSAP
// ═══════════════════════════════════

(() => {
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

  document.querySelectorAll('[data-split="words"]').forEach((el) => {
    el.querySelectorAll(".line").forEach((line) => {
      const nodes = [];
      line.childNodes.forEach((node) => {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (part.trim()) {
              const span = document.createElement("span");
              span.className = "word";
              span.textContent = part;
              nodes.push(span);
            } else if (part) {
              nodes.push(document.createTextNode(part));
            }
          });
        } else {
          const wrapper = node.cloneNode(false);
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (part.trim()) {
              const span = document.createElement("span");
              span.className = "word";
              span.textContent = part;
              wrapper.appendChild(span);
            } else if (part) {
              wrapper.appendChild(document.createTextNode(part));
            }
          });
          nodes.push(wrapper);
        }
      });
      line.innerHTML = "";
      nodes.forEach((n) => line.appendChild(n));
    });
  });

  document.querySelectorAll('[data-split="chars"]').forEach((el) => {
    if (isMobile) {
      el.dataset.splitMobile = "true";
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      return;
    }
    const text = el.textContent;
    el.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        el.appendChild(document.createTextNode(" "));
      } else {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = text[i];
        el.appendChild(span);
      }
    }
  });
})();
