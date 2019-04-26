// 2018 Imagery - cached map service
const imagery2018 = L.esri.tiledMapLayer({
    url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Imagery2018/MapServer',
    maxZoom: 8,
    minZoom: 0,
    continuousWorld: true,
    attribution: 'Cumberland County',
    errorTileUrl: '//downloads2.esri.com/support/TechArticles/blank256.png',
    isLoaded: false
  });

// Roads & Municipal Boundaries - cached map service
const roadsMunicipality = L.esri.tiledMapLayer({
    url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/ArcGIS_Online/RoadsMunicipalBoundaries/MapServer',
    maxZoom: 8,
    minZoom: 0,
    continuousWorld: true,
    attribution: 'Cumberland County',
    errorTileUrl: '//downloads2.esri.com/support/TechArticles/blank256.png',
    isLoaded: false
  });

// Plan Review Features - map service
const planSubmissions = L.esri.featureLayer({
    url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/PlanSubmissionsReview/MapServer/0',
    onEachFeature: function(feature, layer) {
        // Pop-up control for small screen sizes
        if (windowArea < 315000 ) {
            // Hide leaflet controls when pop-up opens
            layer.on('popupopen', function() {
                $('div.leaflet-top').css('opacity', 0);
                $('div.leaflet-bottom').css('opacity', 0);
            });            
            // Display Leaflet controls when pop-up closes
            layer.on('popupclose', function() {
                $('div.leaflet-top').css('opacity', 1);
                $('div.leaflet-bottom').css('opacity', 1);
            });
        }
    },
    isLoaded: false
});

// format popup for plan review featres
const planSubmissions.bindPopup(function(evt, layer) {    
    // reformat date field value
    var jsonDate = evt.feature.properties.DATE;
    var formattedDate = convertJSONDateToString(jsonDate);
    // reformat land use coded domain value
    var landUseField = evt.feature.properties.LANDUSE;
    var formattedLandUse = returnDomainText(landUseField);
    // test for null values in square footage field
    var sqFtField = evt.feature.properties.SQFT;
    var sqFtVal = testforFiedlValues(sqFtField);
    // if value numeric, re-format
    if (sqFtVal !== 'N/A') {
        sqFtVal = returnNumberWithCommas(sqFtField)
    }
    // test for null values in units field
    var unitsField = evt.feature.properties.UNITS
    var unitsVal = testforFiedlValues(unitsField);
    // return popup content
    var popupContent = '<div class="feat-popup">';
    popupContent += '<h3><span class="gray-text">Plan Name:</span> {NAME}</h3>';
    popupContent += '<ul>';
    popupContent += '<li><span class="gray-text">Land Use:</span> ' + formattedLandUse  + '</li>';
    popupContent += '<li><span class="gray-text">Date Received:</span> ' + formattedDate + '</li>';
    popupContent += '<li><span class="gray-text">Square Footage:</span> ' + sqFtVal + '</li>';
     popupContent += '<li><span class="gray-text">Number of Proposed Units:</span> ' + unitsVal + '</li>';
    popupContent += '</ul>';
    popupContent += '<h4><strong>Description:</strong></h4>';
    popupContent += '<p>{DESCRIPTION}</p>';
    popupContent += '</div>';    
    return L.Util.template(popupContent, evt.feature.properties);		
}, {closeOnClick: true, maxHeight: setPopupMaxHeight(windowArea), maxWidth: setPopupMaxWidth(windowWidth)});

// array of map services to run loading function on
const mapServices = [imagery2018,roadsMunicipality, planSubmissions];

// call load/error events function on layers
for (var i = 0; i < mapServices.length; i++) {
    processLoadEvent(mapServices[i]);    
}
// add services to map
for (var i = 0; i < mapServices.length; i++) {
    mapServices[i].addTo(map);
}