const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Mesaj trimis!");
    contactForm.reset();
  });
}

const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-image]"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDetails = document.getElementById("lightboxDetails");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let activeIndex = 0;

function renderSlide(index) {
  if (!galleryButtons.length || !lightboxImage) return;
  activeIndex = (index + galleryButtons.length) % galleryButtons.length;
  const current = galleryButtons[activeIndex];

  lightboxImage.src = current.dataset.src || "";
  lightboxImage.alt = current.dataset.title || "";
  if (lightboxTitle) lightboxTitle.textContent = current.dataset.title || "";
  if (lightboxDetails) lightboxDetails.textContent = current.dataset.details || "";
}

function openLightbox(index) {
  if (!lightbox) return;
  renderSlide(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

for (const [index, button] of galleryButtons.entries()) {
  button.addEventListener("click", () => openLightbox(index));
}

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener("click", () => renderSlide(activeIndex - 1));
if (lightboxNext) lightboxNext.addEventListener("click", () => renderSlide(activeIndex + 1));

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") renderSlide(activeIndex - 1);
  if (event.key === "ArrowRight") renderSlide(activeIndex + 1);
});
