document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([7.8731, 80.7718], 8); // Sri Lanka coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add logic for drawing polygons and saving data to the server
});
