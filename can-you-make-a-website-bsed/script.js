const landing = document.querySelector(".landing");
const sageZone = document.querySelector(".sage-zone");
const lockedScrolls = document.querySelectorAll(".scroll-closed");

if (landing && sageZone) {
  sageZone.addEventListener("mouseenter", () => {
    landing.classList.add("sage-aware");
  });

  sageZone.addEventListener("mouseleave", () => {
    landing.classList.remove("sage-aware");
  });

  sageZone.addEventListener("click", () => {
    landing.classList.remove("sage-nod");
    window.setTimeout(() => landing.classList.add("sage-nod"), 20);
    window.setTimeout(() => landing.classList.remove("sage-nod"), 620);
  });
}

lockedScrolls.forEach((scroll) => {
  scroll.addEventListener("click", () => {
    scroll.classList.remove("is-touched");
    window.setTimeout(() => scroll.classList.add("is-touched"), 20);
    window.setTimeout(() => scroll.classList.remove("is-touched"), 520);
  });
});
