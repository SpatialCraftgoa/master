// Import required modules and CSS
import 'ol/ol.css';
import { Map, View } from 'ol/';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer } from 'ol/layer';
import Projection from 'ol/proj/Projection';
import ImageWMS from 'ol/source/ImageWMS';
import { OSM } from 'ol/source';
import { ScaleLine, defaults as defaultControls } from 'ol/control.js';
import XYZ from 'ol/source/XYZ.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

/*import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction.js';
*/


// Define the URL for the WMS service
//const adns = "http://ec2-13-233-224-228.ap-south-1.compute.amazonaws.com:8080/geoserver/webapp/wms?";
//const serverurl = "http://localhost:8080/geoserver/mvp/wms?";

// Create a ScaleLine control with specified configurations
let control = new ScaleLine({
  units: 'metric',
  steps: 1,
  bar: true,
  text: true,
  minWidth: 100,
  className: 'scale',
});
// Define OSM layer as the base map
const Osmlayer = new TileLayer({
  source: new OSM(),
  visible: false,
  name: 'OSM',
});

// Define the google satellite xyz tile
const googlesatellite = new TileLayer({
  source: new XYZ({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  }),
  visible: true,
  name: "Google Satellite",
});



// Define the EPSG:32643 projection using proj4
proj4.defs('EPSG:32643', '+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs');
register(proj4);

// Get the projection
const mapProjection2 = getProjection('EPSG:32643');;

// Orthophoto/Raster Layer using QGIS Server WMS
const orthosource = new TileWMS({
  url: '',
  params: {                     
    "VERSION": "1.3.0",                                            
    "LAYERS": "",                        
    "FORMAT": "image/png",                                             
  }
});
const ortholayer = new TileLayer({
  source: orthosource,
  opacity:1,
  name: 'Map',

});

/*boundslayer layer*/
const boundslayer = new ImageLayer({
  source: new ImageWMS({ 
    url:'',
    params:{ "LAYERS": "", "VERSION": "1.1.1", "FORMAT": "image/png" }
  }),
  visible:true,
  name:"Plot Boundary",
  graphic:"",
})







// Define the View
// Split the centerpoint string into an array of coordinates
const centerCoordinates = centerpoint.split(',').map(parseFloat);



// Check if the screen width is less than 600px (mobile view)
const isMobile = window.innerWidth <= 600;

// Set zoom level based on device type
const zoomLevel = isMobile ? 15 : 16.5; // Reduce zoom level significantly for mobile view

// Create the view using the center coordinates
const view1 = new View({
    center: centerCoordinates,
    zoom: zoomLevel,
    multiWorld: false,
    projection: mapProjection2,
});


// Define the map
// Define the map
const map = new Map({
  controls: defaultControls().extend([control]),
  //interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
  target: "map",
  layers: [googlesatellite,Osmlayer,ortholayer,boundslayer], // Google Satellite layer first
  view: view1,
});

// Store the map data for later use
$('#map').data('map', map);

