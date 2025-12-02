const mobileMenu = document.getElementById("mobile-menu");
const openIcon = document.getElementById("open-icon");
const closeIcon = document.getElementById("close-icon");

// Open menu
openIcon.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden", "opacity-0", "-translate-y-8");
  mobileMenu.classList.add("opacity-100", "translate-y-0");
});

// Close Menu
closeIcon.addEventListener("click", () => {
  mobileMenu.classList.remove("opacity-100", "translate-y-0");
  mobileMenu.classList.add("opacity-0", "-translate-y-8");

  setTimeout(() => {
    mobileMenu.classList.add("hidden");
  }, 300);
});






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

// Store all image sources
const images = Array.from(galleryImages).map(img => img.src);
let currentIndex = 0;

// Update counter
function updateCounter() {
  currentIndexElem.textContent = currentIndex + 1;
  totalImagesElem.textContent = images.length;
}

// Show image in fullscreen
function showImage(index) {
  currentIndex = index;
  viewerImage.src = images[currentIndex];
  updateCounter();
  highlightThumbnail();
}

// Open fullscreen viewer
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
    imageViewer.classList.remove("hidden");
  });
});

// Close fullscreen viewer
closeBtn.addEventListener("click", () => {
  imageViewer.classList.add("hidden");
});

// Navigate next/prev
nextBtn.addEventListener("click", () => {
  showImage((currentIndex + 1) % images.length);
});

prevBtn.addEventListener("click", () => {
  showImage((currentIndex - 1 + images.length) % images.length);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!imageViewer.classList.contains("hidden")) {
    if (e.key === "Escape") imageViewer.classList.add("hidden");
    else if (e.key === "ArrowRight") showImage((currentIndex + 1) % images.length);
    else if (e.key === "ArrowLeft") showImage((currentIndex - 1 + images.length) % images.length);
  }
});

// Create thumbnail strip
images.forEach((src, index) => {
  const thumb = document.createElement("img");
  thumb.src = src;
  thumb.classList.add("w-16", "h-16", "object-cover", "rounded-lg", "cursor-pointer", "transition-all", "duration-300", "border-2");
  thumb.addEventListener("click", () => showImage(index));
  thumbnailsContainer.appendChild(thumb);
});

// Highlight active thumbnail
function highlightThumbnail() {
  if (!thumbnailsContainer) return;
  const thumbs = thumbnailsContainer.querySelectorAll("img");
  thumbs.forEach((t, i) => {
    t.classList.toggle("border-white", i === currentIndex);
    t.classList.toggle("opacity-50", i !== currentIndex);
  });
}

// Initialize
updateCounter();
