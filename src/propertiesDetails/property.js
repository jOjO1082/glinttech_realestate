// src/propertiesDetails/property.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const idParam = params.get('id') || params.get('slug');

  if (!idParam) {
    document.body.innerHTML = '<p class="p-6">Property not specified. <a href="../listed-properties.html">Back to listings</a></p>';
    return;
  }

  const props = window.properties || [];
  const prop = props.find(p => String(p.id) === String(idParam) || p.slug === idParam);

  if (!prop) {
    document.body.innerHTML = '<p class="p-6">Property not found. <a href="../listed-properties.html">Back to listings</a></p>';
    return;
  }

  const $ = id => document.getElementById(id);

  // Basic fields
  if ($('prop-title')) $('prop-title').textContent = prop.title || '';
  if ($('prop-location')) $('prop-location').textContent = prop.location || '';
  if ($('prop-price')) {
    // keep formatting tolerant: if price is numeric use locale, otherwise output as-is
    const price = prop.price ?? prop.buy ?? prop.rent ?? '';
    $('prop-price').textContent = price
      ? (isFinite(Number(price)) ? `₦${Number(price).toLocaleString()}` : String(price))
      : '';
  }
  if ($('prop-bedrooms')) $('prop-bedrooms').textContent = prop.bedrooms ?? '-';
  if ($('prop-bathrooms')) $('prop-bathrooms').textContent = prop.bathrooms ?? '-';
  if ($('prop-area')) $('prop-area').textContent = prop.area ?? '-';
  if ($('prop-description')) $('prop-description').textContent = prop.description || '';

  // Render gallery
  function renderGallery(property) {
    // images array (prefer prop.images, fallback to prop.image or []):
    const images = Array.isArray(property.images) && property.images.length
      ? property.images.slice()
      : (property.image ? [property.image] : []);

    // If there's an element with id="prop-gallery" we will populate it
    const galleryEl = $('prop-gallery');
    if (galleryEl) {
      galleryEl.innerHTML = '';
      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = property.title || 'Property image';
        img.className = 'w-full h-64 object-cover rounded';
        galleryEl.appendChild(img);
      });
      return;
    }

    // Otherwise attempt to reuse existing .gallery-image elements (in your markup)
    const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
    if (galleryImages.length) {
      // Map provided images into existing slots; repeat last image if fewer images than slots.
      const count = galleryImages.length;
      for (let i = 0; i < count; i++) {
        const src = images[i] ?? images[0] ?? galleryImages[i].src;
        galleryImages[i].src = src;
        // maintain data-index attributes or update them
        galleryImages[i].setAttribute('data-index', i);
        galleryImages[i].alt = property.title || galleryImages[i].alt || 'Property image';
      }

      // Update full-screen viewer counters if they exist
      const totalEl = document.getElementById('total-images');
      if (totalEl) totalEl.textContent = images.length || galleryImages.length || '1';
      const currentEl = document.getElementById('current-index');
      if (currentEl) currentEl.textContent = '1';
    }
  }

  // Render extras (if any) into #prop-extras (non-essential)
  function renderExtras(property) {
    const extrasEl = $('prop-extras');
    if (!extrasEl) return;
    extrasEl.innerHTML = '';
    if (Array.isArray(property.extras) && property.extras.length) {
      const h3 = document.createElement('h3');
      h3.textContent = 'Extras';
      extrasEl.appendChild(h3);
      const ul = document.createElement('ul');
      property.extras.forEach(e => {
        const li = document.createElement('li');
        li.textContent = e;
        ul.appendChild(li);
      });
      extrasEl.appendChild(ul);
    }
  }

  // Build features list: prefer explicit property.features array, otherwise synthesize
  function renderPropertyFeatures(property) {
    const featuresContainer = $('prop-features');
    if (!featuresContainer) return;

    featuresContainer.innerHTML = '';

    // If there's an explicit features array use it
    if (Array.isArray(property.features) && property.features.length) {
      property.features.forEach(text => {
        const li = document.createElement('li');
        li.className = 'list-disc text-slate-500';
        li.textContent = String(text);
        featuresContainer.appendChild(li);
      });
      return;
    }

    // Synthesize sensible features from known fields
    const features = [];

    if (property.bedrooms !== undefined && property.bedrooms !== null) {
      const b = Number(property.bedrooms);
      const bText = Number.isFinite(b) ? `${b} spacious bedroom${b > 1 ? 's' : ''} with good natural lighting` : `${property.bedrooms} bedrooms`;
      features.push(bText);
    }

    if (property.bathrooms !== undefined && property.bathrooms !== null) {
      const ba = Number(property.bathrooms);
      const baText = Number.isFinite(ba) ? `${ba} modern bathroom${ba > 1 ? 's' : ''}` : `${property.bathrooms} bathrooms`;
      features.push(baText);
    }

    if (property.area !== undefined && property.area !== null) {
      // prefer to show area with unit if it looks numeric
      const a = Number(String(property.area).replace(/[,]/g, ''));
      const areaText = Number.isFinite(a) ? `Area: ${a.toLocaleString()} sq ft` : `Area: ${property.area}`;
      features.push(areaText);
    }

    // Furnishing
    if (property.furnished !== undefined) {
      const f = String(property.furnished).toLowerCase();
      if (f === 'true' || f === 'furnished') features.push('Furnished');
      else if (f === 'false' || f === 'unfurnished') features.push('Unfurnished, ready for customization');
    }

    // Parking / garage detection
    if (property.parking || property.hasParking || property.garage) {
      features.push('Ample parking space');
    } else if (property.garage === false) {
      // nothing
    }

    // Gated / security
    if (property.gated || property.isGated) {
      features.push('Gated community / secure neighborhood');
    }

    // Ownership docs
    if (property.c_of_o || property.hasCofO || property.c_of_o === true) {
      features.push('With C-of-O');
    }

    // Additional provided features fields (like 'amenities' or 'highlights')
    if (Array.isArray(property.amenities) && property.amenities.length) {
      property.amenities.forEach(a => features.push(a));
    }

    // If still empty, try using description headline or fallback sentence
    if (features.length === 0 && property.description) {
      const firstSentence = String(property.description).split('.').map(s => s.trim()).filter(Boolean)[0];
      if (firstSentence) features.push(firstSentence);
    }
    if (features.length === 0) features.push('Well-maintained property in a secure neighborhood');

    // Render li elements
    features.forEach(text => {
      const li = document.createElement('li');
      li.className = 'list-disc text-slate-500';
      li.textContent = text;
      featuresContainer.appendChild(li);
    });
  }

  // Run renderers
  try {
    renderGallery(prop);
  } catch (err) {
    // don't break page if gallery issues exist
    // eslint-disable-next-line no-console
    console.warn('Gallery render failed:', err);
  }

  try {
    renderPropertyFeatures(prop);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Features render failed:', err);
  }

  try {
    renderExtras(prop);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Extras render failed:', err);
  }
});