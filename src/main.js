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



// ===== PROPERTY FILTER MODAL =====
 const searchInput = document.getElementById("search-input");
 const filterModal = document.getElementById("property-filter-modal");

  // Open modal when clicking the search input
  searchInput.addEventListener("click", () => {
    filterModal.classList.remove("hidden");
  });

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideModal = filterModal.contains(e.target);
    const clickedInput = searchInput.contains(e.target);

    if (!clickedInsideModal && !clickedInput) {
      filterModal.classList.add("hidden");
    }
  });





// ===== SELECT ELEMENTS =====
const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.querySelector("#viewer-image img");
const closeBtn = document.getElementById("close-btn");

const prevBtn = document.getElementById("prev-image");
const nextBtn = document.getElementById("next-image");

// All gallery images (main + grid)
const galleryImages = document.querySelectorAll(".gallery-image");

// To keep track of which image is currently displayed
let currentIndex = 0;

// ===== OPEN VIEWER =====
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index; // Save clicked index
    openViewer();
  });
});

// Function to open viewer
function openViewer() {
  viewerImage.src = galleryImages[currentIndex].src; // set image
  imageViewer.classList.remove("hidden"); // show fullscreen
}

// ===== CLOSE VIEWER =====
closeBtn.addEventListener("click", () => {
  imageViewer.classList.add("hidden");
});

// ===== NEXT IMAGE =====
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length; 
  viewerImage.src = galleryImages[currentIndex].src;
});

// ===== PREVIOUS IMAGE =====
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  viewerImage.src = galleryImages[currentIndex].src;
});



// const options = document.querySelectorAll(".option");

//   options.forEach(option => {
//     option.addEventListener("click", () => {
//       // Remove active class from all
//       options.forEach(opt => opt.classList.remove("active-option", "bg-mainSecondary-500", "text-white"));
//       opt.classList.add("bg-white");

//       // Add active class to clicked
//       option.classList.add("active-option", "bg-mainSecondary-500", "text-white");
//       option.classList.remove("bg-white");
//     });
//   });
