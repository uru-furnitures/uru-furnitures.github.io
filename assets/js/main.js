// Mobile / tablet menu
const header = document.querySelector(".site-header");
const toggle = header.querySelector(".menu-toggle");
toggle.addEventListener("click", () => {
  const open = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

// Image carousels: arrows, dots, keyboard and swipe
const chevron = (d) =>
  `<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="${d}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

document.querySelectorAll(".gallery").forEach((gallery) => {
  const slides = [...gallery.querySelectorAll("img")];
  let index = 0;

  const prev = document.createElement("button");
  prev.className = "gallery-arrow prev";
  prev.type = "button";
  prev.ariaLabel = "Previous image";
  prev.innerHTML = chevron("M8.75 2.5L4.25 7L8.75 11.5");

  const next = document.createElement("button");
  next.className = "gallery-arrow next";
  next.type = "button";
  next.ariaLabel = "Next image";
  next.innerHTML = chevron("M5.25 2.5L9.75 7L5.25 11.5");

  const dots = document.createElement("div");
  dots.className = "gallery-dots";
  dots.ariaLive = "polite";
  const dotButtons = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.ariaLabel = `Go to image ${i + 1}`;
    dot.addEventListener("click", () => show(i));
    dots.append(dot);
    return dot;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((img, n) => (img.hidden = n !== index));
    dotButtons.forEach((dot, n) => dot.setAttribute("aria-current", n === index));
  }

  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
  });

  // Swipe on touch; a drag (touch or mouse) should not trigger the image link.
  let startX = null;
  let dragged = false;
  gallery.addEventListener("pointerdown", (e) => { startX = e.clientX; dragged = false; });
  gallery.addEventListener("pointermove", (e) => {
    if (startX !== null && Math.abs(e.clientX - startX) > 10) dragged = true;
  });
  gallery.addEventListener("pointerup", () => { startX = null; });
  gallery.addEventListener("click", (e) => { if (dragged) e.preventDefault(); }, true);

  let touchX = null;
  gallery.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  gallery.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) >= 40) show(dx < 0 ? index + 1 : index - 1);
  });

  gallery.append(prev, next, dots);
  show(0);
});
