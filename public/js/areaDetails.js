function areaSize(coordinates) {
    const numPoints = coordinates.length;
    let area = 0;

    for (let i = 0; i < numPoints; i++) {
        const j = (i + 1) % numPoints;
        const xi = coordinates[i][0];
        const yi = coordinates[i][1];
        const xj = coordinates[j][0];
        const yj = coordinates[j][1];

        area += (xi * yj) - (xj * yi);
    }

    return Math.abs(area / 2);
}

function init() {
    const areaId = document.getElementById('areaId').textContent;
    const areaSizeElement = document.getElementById('areaSize');

    fetch(`/api/areas/${areaId}`)
        .then(response => response.json())
        .then(data => {
            areaSizeElement.textContent = `${areaSize(data.coordinates)} square km`;
        })
        .catch(error => console.error('Error fetching area details:', error));
}

document.addEventListener('DOMContentLoaded', init);
