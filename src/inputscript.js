// ===== PROPERTY FILTER MODAL (safe) =====
const searchInput = document.getElementById("search-input");
const filterModal = document.getElementById("property-filter-modal");

if (searchInput && filterModal) {
  searchInput.addEventListener("click", () => {
    filterModal.classList.remove("hidden");
  });

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
    if (!filterModal || !searchInput) return;
    const clickedInsideModal = filterModal.contains(e.target);
    const clickedInput = searchInput.contains(e.target);
    if (!clickedInsideModal && !clickedInput) {
      filterModal.classList.add("hidden");
    }
  });
}

// ===== FILTER PROPERTIES =====
// GET FILTER INPUTS
const selectedLocation = document.getElementById("location");
const selectedHouseType = document.getElementById("house-type"); // normalized name
const selectedPrice = document.getElementById("price-range");

// SEARCH BUTTONS: single desktop button, possibly multiple mobile buttons
const desktopSearchButton = document.querySelector(".icon-container-search");
const mobileSearchButtons = document.querySelectorAll(".search-button");

// SELECT ALL PROPERTY CARDS (updated when filtering)
let allPropertyCards = document.querySelectorAll(".feature-card");

// CONVERT PRICE RANGE VALUE "100000-2000000" INTO REAL MIN/MAX
function parsePriceRange(range) {
  if (!range || range === "") return { min: 0, max: Infinity };
  if (range.includes("+")) {
    const min = parseInt(range.replace("+", ""), 10);
    return { min, max: Infinity };
  }
  const parts = range.split("-").map(s => s.trim());
  const min = Number(parts[0]) || 0;
  const max = Number(parts[1]) || Infinity;
  return { min, max };
}

// FILTER PROPERTIES
function filterProperties() {
  // refresh cards in case render changed them
  allPropertyCards = document.querySelectorAll(".feature-card");

  const userSelectedLocation = selectedLocation && selectedLocation.value ? selectedLocation.value.toLowerCase() : "";
  const userSelectedHouseType = selectedHouseType && selectedHouseType.value ? selectedHouseType.value.toLowerCase() : "";
  const userSelectedPriceRange = selectedPrice && selectedPrice.value ? selectedPrice.value : "";

  const { min, max } = parsePriceRange(userSelectedPriceRange);

  allPropertyCards.forEach(card => {
    const cardHouseLocation = (card.dataset.location || "").toLowerCase();
    const cardHouseType = (card.dataset.type || "").toLowerCase();
    const cardHousePrice = Number(card.dataset.price) || 0;

    // empty selection => match-all
    const locationMatch = !userSelectedLocation || cardHouseLocation.includes(userSelectedLocation);
    const typeMatch = !userSelectedHouseType || cardHouseType === userSelectedHouseType;
    const priceMatch = !userSelectedPriceRange || (cardHousePrice >= min && cardHousePrice <= max);

    // Use AND logic: all selected criteria must match.
    if (locationMatch && typeMatch && priceMatch) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  if (filterModal) filterModal.classList.add("hidden");
}

// Attach listeners safely
if (desktopSearchButton) desktopSearchButton.addEventListener("click", filterProperties);
if (mobileSearchButtons && mobileSearchButtons.length) {
  mobileSearchButtons.forEach(btn => btn.addEventListener("click", filterProperties));
}