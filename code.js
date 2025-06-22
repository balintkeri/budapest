

const map = L.map('map').setView([47.4979, 19.0402], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const places = [
    {
    name: "Paprika Étterem",
    type: ["kaja", "magyar"],
    lat: 47.5073,
    lng: 19.0841,
    description: "Hagyományos magyar ételek barátságos áron.",
    link: "https://paprikaetterem.hu"
    },
    {
    name: "Szimpla Kert",
    type: ["pia", "látványosság"],
    lat: 47.4969,
    lng: 19.0657,
    description: "Ikonikus romkocsma Budapest szívében.",
    link: "https://szimpla.hu"
    },
    {
    name: "Fisherman's Bastion",
    type: ["látványosság"],
    lat: 47.5026,
    lng: 19.0347,
    description: "Gyönyörű kilátás a városra a Halászbástyáról.",
    link: "https://www.budapest.com/..."
    }
];

const markers = [];
const activeFilters = new Set();

const allTags = [...new Set(places.flatMap(p => p.type))];
const filterContainer = document.getElementById('filters');

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
    // clear markers
    markers.forEach(m => map.removeLayer(m));
    markers.length = 0;

    const list = document.getElementById('places');
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
    div.innerHTML = `<strong>${place.name}</strong><br>${place.description}<br><a href="${place.link}" target="_blank">Link</a>`;
    list.appendChild(div);
    });
}

render();