import { fromLonLat } from 'ol/proj';

const map = $('#map').data('map');

// Function to zoom to a location using Nominatim API
async function zoomToLocation(locationName) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`);
        const data = await response.json();

        if (data.length > 0) {
            const location = data[0];
            const coordinates = fromLonLat([parseFloat(location.lon), parseFloat(location.lat)], 'EPSG:3857');

            // Center and zoom the map with animation
            map.getView().animate({
                center: coordinates,
                zoom: 17,
                duration: 1000 // 1 second
            });
        } else {
            console.error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching location:', error);
    }
}

// Add click event listeners to each landmark-location td
document.querySelectorAll('.landmark-location').forEach(td => {
    td.addEventListener('click', () => {
        const locationName = td.getAttribute('data-name'); // Get the name from data attribute
        console.log('Clicked location name:', locationName); // Log the name or use it as needed
        zoomToLocation(locationName);
    });
});
