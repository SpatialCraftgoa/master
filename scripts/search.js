import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Stroke, Style } from "ol/style";
import WFS from 'ol/format/WFS';
import { equalTo } from 'ol/format/filter';
import GeoJSON from 'ol/format/GeoJSON';

const map = $('#map').data('map');
const searchBtn = $('#search');
const searchBtn_mob=$('#search_mob');
const wfsurl = "https://reservemyplot.com:4433/geoserver/Quelosim/wfs";

const vectorSource = new VectorSource();
const style = new Style({
    stroke: new Stroke({
        color: 'blue',
        width: 3
    })
});

const vector = new Vector({
    source: vectorSource,
    style: style
});

map.addLayer(vector);

// Desktop view
searchBtn.click(function (event) {
    event.preventDefault();
    handleSearch('#plot-input');
});

// Mobile view
searchBtn_mob.click(function (event) {
    event.preventDefault();
    handleSearch('#plot-input_mob');
});


function handleSearch(plotInputSelector) {
    const plot = $(plotInputSelector).val().toString();
    if (plot.length === 0) {
        window.alert('Please enter a correct plot number');
        return;
    }

    const featureRequest = new WFS().writeGetFeature({
        srsName: 'EPSG:3857',
        featureNS: 'https://reservemyplot.com:4433/geoserver/Quelosim',
        featurePrefix: 'Quelosim',
        featureTypes: ['plot'],
        outputFormat: 'application/json',
        filter: equalTo('plot', plot)
    });

    console.log('WFS Request:', new XMLSerializer().serializeToString(featureRequest));

    fetch(wfsurl, {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log('WFS Response:', json);

        if (json.features && json.features.length > 0) {
            const features = new GeoJSON().readFeatures(json);
            vectorSource.clear(true);
            vectorSource.addFeatures(features);

            // Adjusted the animation duration for the fit method
            map.getView().fit(vectorSource.getExtent(), { duration: 1000, maxZoom: 21 }); // Adjust maxZoom as needed
            // Clear the search box
            $(plotInputSelector).val('');
            // Set a timer to reset the vector source and style after 5000 milliseconds (5 seconds)
            setTimeout(function () {
                vectorSource.clear(true);
            }, 30000);
        } else {
            window.alert("No features found");
        }
    });
}

