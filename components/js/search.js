const addressSearchControl,
    ccpaProvider,
    featureLayerProvider;
    
// CCPA Composite Locatoer
const ccpaProvider = L.esri.Geocoding.geocodeServiceProvider({
    label: 'Street Addresses',
    maxResults: 8,
    attribution: 'Cumberland County',
    url: '//gis.ccpa.net/arcgiswebadaptor/rest/services/Composite_Address_Locator/GeocodeServer' 
});
    
// Feature Layer Provider - Submitted Plans
const featureLayerProvider = L.esri.Geocoding.featureLayerProvider({
    url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/Planning/PlanSubmissionsReview/MapServer/0',
    label: 'Submitted Plans',
    maxResults: 8,
    searchFields: ['NAME'],
    formatSuggestion: function(feature){
        return feature.properties.NAME;
    }    
});      
    
 const addressSearchControl = L.esri.Geocoding.geosearch({
     useMapBounds: false,
     providers: [featureLayerProvider,ccpaProvider],
     placeholder: 'Search by Plan Name or Street Address',
     title: 'Search Tool',        
     expanded: true,
     collapseAfterResult: false,
     zoomToResult: false
}).addTo(map);
    
/*** Address search results event ***/
addressSearchControl.on('results', function(data) {  
    // make sure there is a result
    if (data.results.length > 0) {
        // set map view
        map.setView(data.results[0].latlng, 7);
            
        // open pop-up for location
        var popup = L.popup({closeOnClick: true}).setLatLng(data.results[0].latlng).setContent(data.results[0].text).openOn(map);            
    } else {
        // open pop-up with no results message
        var popup = L.popup({closeOnClick: true}).setLatLng(map.getCenter()).setContent('No results were found. Please try a different address.').openOn(map);           
    }
        
    // close search panel
    $('#panelSearch').collapse("hide");        
});