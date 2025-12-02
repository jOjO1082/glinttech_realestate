// // ===== PROPERTY FILTER MODAL =====
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
    // // ===== END PROPERTY FILTER MODAL =====