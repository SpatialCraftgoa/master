// Function to get layer by name
function getLayerByName(map, layerName) {
    // Get all layers from the map
    const layers = map.getLayers().getArray();
    
    // Iterate through each layer to find the one with the matching name
    let layer = null;
    layers.forEach(lyr => {
      const currentLayerName = lyr.get('name');
      if (currentLayerName === layerName) {
        layer = lyr;  // Assign the layer if name matches
      }
    });
    
    // Return the found layer or null if not found
    return layer;
  }
  
  // Ensure the document is ready before accessing elements
  document.addEventListener('DOMContentLoaded', () => {
    // Get map instance
    const map = $('#map').data('map');
    
    // Get the slider element
    const slider = document.getElementById('opacitySlider');
    
    // Add an event listener to the slider
    slider.addEventListener('input', function() {
      const opacity = slider.value / 100; // Convert slider value to a fraction
      const layer = getLayerByName(map, 'Map');
      
      if (layer) {
        layer.setOpacity(opacity); // Set the opacity of the layer
      } else {
        console.error('Layer not found');
      }
    });
  });
  