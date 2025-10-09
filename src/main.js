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

// Display modal for property filter
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("property-filter-modal");

// Show modal on click
searchInput.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

// hide modal when clicking outside
document.addEventListener("click", () => {
  const isClickInside =
    modal.contains(event.target) || searchInput.contains(event.target);
  if (!isClickInside) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
});
