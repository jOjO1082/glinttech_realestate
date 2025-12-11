// Safe menu handlers
const mobileMenu = document.getElementById("mobile-menu");
const openIcon = document.getElementById("open-icon");
const closeIcon = document.getElementById("close-icon");

if (openIcon && mobileMenu) {
  openIcon.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden", "opacity-0", "-translate-y-8");
    mobileMenu.classList.add("opacity-100", "translate-y-0");
  });
}

if (closeIcon && mobileMenu) {
  closeIcon.addEventListener("click", () => {
    mobileMenu.classList.remove("opacity-100", "translate-y-0");
    mobileMenu.classList.add("opacity-0", "-translate-y-8");
    setTimeout(() => mobileMenu.classList.add("hidden"), 300);
  });
}

// ===== IMAGE VIEWER FUNCTIONALITY =====
// Select elements
const galleryImages = document.querySelectorAll(".gallery-image");
const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.querySelector("#viewer-image img");
const closeBtn = document.getElementById("close-btn");
const prevBtn = document.getElementById("prev-image");
const nextBtn = document.getElementById("next-image");
const currentIndexElem = document.getElementById("current-index");
const totalImagesElem = document.getElementById("total-images");
const thumbnailsContainer = document.querySelector(".thumbnails-container");

let images = [];
let currentIndex = 0;

if (galleryImages && galleryImages.length && imageViewer && viewerImage) {
  images = Array.from(galleryImages).map(img => img.src);

  function updateCounter() {
    if (currentIndexElem) currentIndexElem.textContent = currentIndex + 1;
    if (totalImagesElem) totalImagesElem.textContent = images.length;
  }

  function highlightThumbnail() {
    if (!thumbnailsContainer) return;
    const thumbs = thumbnailsContainer.querySelectorAll("img");
    thumbs.forEach((t, i) => {
      t.classList.toggle("border-white", i === currentIndex);
      t.classList.toggle("opacity-50", i !== currentIndex);
    });
  }

  function showImage(index) {
    currentIndex = index;
    viewerImage.src = images[currentIndex];
    updateCounter();
    highlightThumbnail();
  }

  galleryImages.forEach((img, index) => {
    if (!img) return;
    img.addEventListener("click", () => {
      showImage(index);
      imageViewer.classList.remove("hidden");
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", () => imageViewer.classList.add("hidden"));
  if (nextBtn) nextBtn.addEventListener("click", () => showImage((currentIndex + 1) % images.length));
  if (prevBtn) prevBtn.addEventListener("click", () => showImage((currentIndex - 1 + images.length) % images.length));

  document.addEventListener("keydown", (e) => {
    if (!imageViewer || imageViewer.classList.contains("hidden")) return;
    if (e.key === "Escape") imageViewer.classList.add("hidden");
    else if (e.key === "ArrowRight") showImage((currentIndex + 1) % images.length);
    else if (e.key === "ArrowLeft") showImage((currentIndex - 1 + images.length) % images.length);
  });

  if (thumbnailsContainer) {
    images.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.classList.add("w-16", "h-16", "object-cover", "rounded-lg", "cursor-pointer", "transition-all", "duration-300", "border-2");
      thumb.addEventListener("click", () => showImage(index));
      thumbnailsContainer.appendChild(thumb);
    });
  }

  updateCounter();
} else {
  // viewer not present on this page — avoid runtime errors
  // console.debug("Image viewer or gallery images missing; viewer disabled on this page.");
}