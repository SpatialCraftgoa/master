import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import Projection from 'ol/proj/Projection';

const mapProjection2 = new Projection({
  code: 'EPSG:3857',
  units: 'm',
  axisOrientation: 'neu',
  global: false,
});

const map = $('#map').data('map');
const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

map.addLayer(vectorLayer);

$(document).ready(function () {
  let geolocation;
  let positionFeature;
  let isButtonBlue = false; // Variable to keep track of button color

  // Handle button click
  $('#my-location-button').on('click', function () {
    const locator = document.getElementById('my-location-button');
    if (!isButtonBlue) {
      // Button is not blue, change to blue
      locator.style.backgroundColor = 'blue';
      isButtonBlue = true;

      // Initialize Geolocation object
      geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: mapProjection2
      });

      // Handle Geolocation errors
      geolocation.on('error', function (error) {
        alert('Geolocation error: ' + error.message);
        if (error.code === 1) {
          // If user denies location access, show an alert or message
          alert('Please enable location services to use this feature.');
        }
      });

      // Handle change in position
      geolocation.on('change:position', function () {
        const coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        if (isButtonBlue && coordinates && geolocation.getTracking()) {
          map.getView().animate({
            center: coordinates,
            zoom: 17,
            duration: 1000,
          });
        }
      });

      // Add position feature to vector source
      positionFeature = new Feature();
      positionFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({
              color: '#3399CC',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
          }),
        })
      );
      vectorSource.addFeature(positionFeature);

      // Start tracking the user's position
      geolocation.setTracking(true);
    } else {
      // Button is blue, change to white
      locator.style.backgroundColor = 'white';
      isButtonBlue = false;

      // Stop tracking the user's position
      geolocation.setTracking(false);

      // Remove position feature from vector source
      vectorSource.removeFeature(positionFeature);
    }

    // Zoom to geolocation if available and button is blue
    if (isButtonBlue) {
      const coordinates = geolocation.getPosition();
      if (coordinates && geolocation.getTracking()) {
        map.getView().animate({
          center: coordinates,
          zoom: 17,
          duration: 1000,
        });
      }
    }
  });
});
