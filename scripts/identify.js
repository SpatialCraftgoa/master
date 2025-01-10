// Import required modules and CSS
import 'ol/ol.css';
import Overlay from 'ol/Overlay.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import { getLayerByName } from './customFunctions';

const map = $('#map').data('map'); // map data
const mapLayers = map.getLayers();

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;

  // Check if the click is on the 'Plots' layer
  const plotsLayer = getLayerByName('Plots');

  if (plotsLayer && plotsLayer.getVisible()) {
    const plotsSrc = plotsLayer.getSource();
    const resolution = map.getView().getResolution();
    const projection = map.getView().getProjection();

    const plotsUrl = plotsSrc.getFeatureInfoUrl(coordinate, resolution, projection, {
      'INFO_FORMAT': 'application/json',
    });

    if (plotsUrl) {
      $.ajax({
        url: plotsUrl,
        method: 'GET',
        success: function (result) {
          const plotspop = result.features[0];

          if (plotspop) {
            const Survey_No = plotspop.properties.plot;
    

            const plotsinfo = $('#info');
            plotsinfo.html(`<h5>Plot Info:</h5>
              <style>
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff;
                  text-decoration: none;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                }
                h5{
                  font-size:20px
                }
              </style>
              <script>
                function val() {
                  var plot = '${Survey_No}';
                  var project = $('#Title').text();
                  window.open('./formzoho.html?survey=' + plot,  '&project=' + project, '_blank');
                }
              </script>
              <p>Plot Number: ${Survey_No}</p>
             
              <p id="damn"></p>
             <button id="clickButton" onclick="val()" class="button" ">Enquire</button>
            `);

            // Clear the 'noFeatures' message
            $('#no-feature').html('');

            // Set the overlay position only if it's on the 'Plots' layer
            overlay.setPosition(coordinate);
          }
        },
      });
    }

    // Do not continue to the base map handling
    return;
  }

  // If not on the 'Plots' layer, hide the popup
  overlay.setPosition(undefined);
});
