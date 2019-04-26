// return text for map legend alt text
function returnAltTextForLegend(layerName, layerLabel) {
    var appendText;
    if (layerLabel === "" || layerLabel === " ") {
        appendText = layerName;
    } else {
        appendText = layerLabel;
    }
    var altText = 'alt="legend icon representing ' + appendText + '"';
    return altText;
}

// create a legend element for a map service
function createMapLegend(url,element) {
	// legend plugin uses dynamic map layer object
	var dynamicMapService = L.esri.dynamicMapLayer({url: url});	
	dynamicMapService.legend(function(error, legend) {
		var html = '';
		if(!error) {
			for (var i = 0, len = legend.layers.length; i < len; i++) {
				html += '<ul>'
				html += '<li><strong>' + legend.layers[i].layerName + '</strong></li>';
				for(var j = 0, jj = legend.layers[i].legend.length; j < jj; j++){
					var iconAlt = returnAltTextForLegend(legend.layers[i].layerName, legend.layers[i].legend[j].label);
                    
                    html += L.Util.template('<li><img ' + iconAlt + ' width="{width}" height="{height}" src="data:{contentType};base64,{imageData}"><span>{label}</span></li>', legend.layers[i].legend[j]);
				}
				html += '</ul>';
			}
                } else {
			html+= '<h4>There was an error creating the legend</h4>';
		}		
		$(element).prepend(html);		
	});
}

// Create Map Legend
createMapLegend('https://gis.ccpa.net/arcgiswebadaptor/rest/services/ArcGIS_Online/RoadsMunicipalBoundaries/MapServer', '#map-legend-content');
createMapLegend('https://gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/PlanSubmissionsReview/MapServer', '#map-legend-content');