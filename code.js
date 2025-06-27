const map = L.map('map').setView([47.4979, 19.0402], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = [];
const activeFilters = new Set();
const filterContainer = document.getElementById('filters');
const list = document.getElementById('places');

// derive all tags
const allTags = [...new Set(places.flatMap(p => p.type))];

// render filter buttons
allTags.forEach(tag => {
  const btn = document.createElement('button');
  btn.textContent = tag;
  btn.addEventListener('click', () => {
    if (activeFilters.has(tag)) {
      activeFilters.delete(tag);
      btn.classList.remove('active');
    } else {
      activeFilters.add(tag);
      btn.classList.add('active');
    }
    render();
  });
  filterContainer.appendChild(btn);
});

function render() {
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
  list.innerHTML = '';

  const filtered = places.filter(p => {
    if (activeFilters.size === 0) return true;
    return [...activeFilters].some(tag => p.type.includes(tag));
  });

  filtered.forEach(place => {
    const marker = L.marker([place.lat, place.lng]).addTo(map);
    marker.bindPopup(`<b>${place.name}</b><br>${place.description}`);
    markers.push(marker);

    const div = document.createElement('div');
    div.className = 'place';
    div.innerHTML = `<strong>${place.name}</strong><br>${place.description}<br><a href=\"${place.link}\" target=\"_blank\">Link</a>`;
    list.appendChild(div);
  });
}

render();
