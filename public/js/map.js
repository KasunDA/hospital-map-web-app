document.addEventListener('DOMContentLoaded', () => {
    // Initialize map and other Leaflet configurations

    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems },
        draw: { polygon: true, polyline: false, circle: false, marker: false }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        const type = e.layerType;
        const layer = e.layer;

        if (type === 'polygon') {
            const coordinates = layer.getLatLngs()[0].map(coord => [coord.lat, coord.lng]);
            document.getElementById('coordinates').value = JSON.stringify(coordinates);

            // AJAX to fetch satellite image and update the form
            fetchSatelliteImage(coordinates);
        }
    });

    function fetchSatelliteImage(coordinates) {
        const apiKey = 'YOUR_NASA_API_KEY'; // Replace with your NASA API key
        const date = new Date().toISOString().split('T')[0]; // Today's date
        const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${coordinates[0][1]}&lat=${coordinates[0][0]}&date=${date}&dim=0.1&api_key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    document.getElementById('imageUrl').value = data.url;
                } else {
                    console.error('No image found:', data);
                }
            })
            .catch(error => console.error('Error fetching image:', error));
    }
});
