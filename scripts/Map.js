// Import required modules and CSS
import 'ol/ol.css';
import { Map, View } from 'ol/';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import { OSM } from 'ol/source';
import { ScaleLine, defaults as defaultControls } from 'ol/control.js';
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

// ScaleLine control
let control = new ScaleLine({
    units: 'metric',
    steps: 1,
    bar: true,
    text: true,
    minWidth: 100,
    className: 'scale',
});

// Basemaps
const Osmlayer = new TileLayer({
    source: new OSM(),
    visible: false,
    name: 'OSM',
});

const googlesatellite = new TileLayer({
    source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
    }),
    visible: true,
    name: "Google Satellite"
});

// Projection setup
proj4.defs('EPSG:32643', '+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs');
register(proj4);
const mapProjection2 = getProjection('EPSG:32643');

// Primary raster layer - will be replaced by bash script

const ortholayer = new TileLayer({
    source: new TileWMS({
        url: 'https://reservemyplot.com/cgi-bin/qgis_mapserv.fcgi?MAP=/home/qgis/cola/cola.qgs&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=colatif&FORMAT=image/png&STYLE=default',
    }),
    opacity: 1,
    name: 'Map',
});


  


const surveyplan = new ImageLayer({
    source: new ImageWMS({
        url: 'https://reservemyplot.com/cgi-bin/qgis_mapserv.fcgi?MAP=/home/qgis/cola/cola.qgs&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=plotbounds&FORMAT=image/png&STYLE=default',  // <-- This should be inside an object
    }),
    visible: true,
    name: "Govt. Survey Plan",
});


const physicalbounds = new ImageLayer({
    source: new ImageWMS({
        url: 'https://reservemyplot.com/cgi-bin/qgis_mapserv.fcgi?MAP=/home/qgis/cola/cola.qgs&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=physcialbounds&FORMAT=image/png&STYLE=default',  // <-- This should be inside an object
    }),
    visible: true,
    name: "Physical Survey Boundary",
});

// View configuration
const centerCoordinates = centerpoint.split(',').map(parseFloat);
const isMobile = window.innerWidth <= 600;
const zoomLevel = isMobile ? 17 : 18.5;

const view1 = new View({
    center: centerCoordinates,
    zoom: zoomLevel,
    multiWorld: false,
    projection: mapProjection2,
});

// Map configuration
const map = new Map({
    controls: defaultControls().extend([control]),
    target: "map",
    layers: [
        googlesatellite,
        Osmlayer,
        ortholayer,physicalbounds,surveyplan,
   
    // more boundslayers injected dynamically if needed
    ],
    view: view1,
});

// Store map reference for later
$('#map').data('map', map);
