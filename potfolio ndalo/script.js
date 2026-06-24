document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    document.body.classList.add("loaded");
    document.body.classList.remove("is-loading");
  }, 650);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const memeButtons = document.querySelectorAll(".meme-card");
const memeSelect = document.querySelector('select[name="meme-style"]');

memeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    memeButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");

    if (memeSelect) {
      memeSelect.value = button.textContent.trim();
    }
  });
});

const canUse3dEffects = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUse3dEffects && !prefersReducedMotion) {
  document.querySelectorAll(".hero-panel, .service-card, .meme-card, .project-card, .contact-form").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${((x / rect.width) * 100).toFixed(1)}%`);
      card.style.setProperty("--glow-y", `${((y / rect.height) * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "50%");
    });
  });
}
