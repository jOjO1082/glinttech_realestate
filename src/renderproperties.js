// src/renderproperties.js
// Renders property cards. Uses window.properties when available.

const properties = window.properties || [
  // fallback data (same 4 items if propertiesData.js isn't loaded)
  {
    id: 1,
    title: "3 Bedroom Apartment",
    location: "lagos",
    houseType: "apartment",
    price: 250000,
    featured: true,
    image: "images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg",
    images: ["images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg"],
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    rent: true,
    buy: false,
    description: "A comfortable 3 bedroom apartment with good finishes and great location."
  },
  {
    id: 2,
    title: "Luxury Duplex",
    location: "abuja",
    houseType: "duplex",
    price: 180000000,
    featured: false,
    image: "images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg",
    images: ["images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg"],
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    rent: false,
    buy: true,
    description: "Spacious luxury duplex with modern touches and large compound."
  },
  {
    id: 3,
    title: "Mini Flat",
    location: "enugu",
    houseType: "mini-flat",
    price: 120000,
    featured: false,
    image: "images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg",
    images: ["images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg"],
    bedrooms: 2,
    bathrooms: 1,
    area: 800,
    rent: true,
    buy: false,
    description: "Cozy mini flat suitable for a small family or singles."
  },
  {
    id: 4,
    title: "Self Contain",
    location: "ibadan",
    houseType: "self-contain",
    price: 75000,
    featured: false,
    image: "images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg",
    images: ["images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg"],
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    rent: true,
    buy: false,
    description: "Compact self-contain, affordable and convenient."
  }
];

const cardsContainer = document.getElementById("properties-cards-container");

function renderProperties(list) {
  if (!cardsContainer) return; // guard when run on pages without container
  cardsContainer.innerHTML = ""; // Clear before adding

  list.forEach((p) => {
    const href = `./propertiesDetails/property.html?id=${encodeURIComponent(p.id)}`;

    const card = `
      <div
        class="feature-card w-full h-auto p-4 flex flex-col justify-start items-start rounded-lg overflow-hidden shadow-md bg-white-100 md:w-[48%] lg:w-[31%]"
        data-location="${String(p.location).toLowerCase()}"
        data-type="${String(p.houseType).toLowerCase()}"
        data-price="${p.price}"
      >
        <div class="feature-card-image relative w-full h-56 overflow-hidden rounded-md">
          <img src="${p.image}" class="w-full h-full object-cover rounded-lg" />

          <div class="absolute top-6 left-6 flex flex-col gap-2 bg-opacity-70 rounded-lg">
          ${p.featured ? `<div class="chip bg-mainSecondary-400 text-white-100 px-3 py-1 rounded-lg text-[16px] font-medium"><span>Featured</span></div>` : ""}
          ${p.rent ? `<div class="chip bg-slate-800 text-white-100 px-3 py-1 rounded-lg text-[16px] font-medium"><span>For rent</span></div>` : ""}
          ${p.buy ? `<div class="chip bg-slate-800 text-white-100 px-3 py-1 rounded-lg text-[16px] font-medium"><span>For sale</span></div>` : ""}
          </div>
        </div>

        <div class="feature-card-details w-full h-auto mt-4 flex flex-col justify-start items-start gap-2 px-2">
          <h3 class="text-lg font-semibold">${p.title}</h3>

          <div class="property-loaction w-full h-auto flex flex-row justify-start items-center gap-2 text-gray-800">
            <span class="text-gray-700 capitalize">${p.location}</span>
          </div>

          <div class="property-amenities w-full h-auto flex flex-row flex-wrap justify-start items-center gap-4 border-b-2 pb-8 text-gray-600">
            <div class="bedrooms flex flex-row justify-start items-center gap-2">
              <h4 class="text-[14px] md:text-[16px] font-medium"><span class="font-bold">${p.bedrooms}</span> bedrooms</h4>
            </div>

            <div class="bathrooms flex flex-row justify-start items-center gap-2">
              <h4 class="text-[14px] md:text-[16px] font-medium"><span class="font-bold">${p.bathrooms}</span> bathrooms</h4>
            </div>

            <div class="area flex flex-row justify-start items-center gap-2">
              <h4 class="text-[14px] md:text-[16px] font-medium"><span class="font-bold">${p.area}</span> Sqm</h4>
            </div>
          </div>

          <div class="property-price w-full h-auto flex flex-row justify-between items-center">
            <h2 class="font-bold text-2xl md:text-3xl text-mainSecondary-400">₦${Number(p.price).toLocaleString()}</h2>

            <a href="${href}">
              <button class="view-details-button bg-mainSecondary-400 px-4 py-4 rounded-lg w-fit h-auto hover:bg-mainSecondary-300 cursor-pointer font-medium text-[14px] md:text-[18px]">
                View details
              </button>
            </a>
          </div>
        </div>
      </div>
    `;

    cardsContainer.innerHTML += card;
  });
}

// Only attempt to render when DOM container exists
renderProperties(properties);