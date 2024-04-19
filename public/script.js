function fetchImage() {
    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;
    const date = document.getElementById('date').value;

    fetch(`/satellite-image?lat=${lat}&lon=${lon}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            if (data.imageUrl) {
                document.getElementById('satelliteImage').src = data.imageUrl;
            } else {
                alert('No image found for the given date and location.');
            }
        })
        .catch(error => console.error('Error fetching image:', error));
}
