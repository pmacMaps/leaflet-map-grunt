//  Basemap Changer
function zoomToMuni(selectedMuni) {    
    // where clause
    var whereClause = '"MUNI" = ' + "'" + selectedMuni + "'";
    var query = L.esri.query({
        url: 'https://gis.ccpa.net/arcgiswebadaptor/rest/services/ArcGIS_Online/RoadsMunicipalBoundaries/MapServer/0'
    });    
    query.where(whereClause).bounds(function(error, latLngBounds, response) {
        if (error) {
            // add message to console
            console.warn('An error with the query request has occured');
            console.warn('Code: ' + error.code + '; Message: ' + error.message);
            // set content of results element
        } else if (response.features < 1) {        
         // add message to console
         console.log('No features selected');
         // set content of results element
        } else {
            map.fitBounds(latLngBounds);
        }
    });    
    // close basemap panel
    $('#panelMuniZoom').collapse("hide");
}

// function to handle load event for map services
function processLoadEvent(service) {
   // service request success event
   service.on('requestsuccess', function(e) {     
      // set isLoaded property to true
      service.options.isLoaded = true;      
   });     
   // request error event
   service.on('requesterror', function(e) {      
      // if the error url matches the url for the map service, display error messages
      // without this logic, various urls related to the service appear
      if (e.url == service.options.url) {          
         // set isLoaded property to false
         service.options.isLoaded = false; 
        
         // add warning messages to console
         console.warn('Layer failed to load: ' + service.options.url);
         console.warn('Code: ' + e.code + '; Message: ' + e.message);
                              
         // show modal window
         $('#layerErrorModal').modal('show'); 
      }
   });
}

// Set max height of pop-up window 
function setPopupMaxHeight(windowArea) {
    var maxHeight;
    if (windowArea < 315000 ) {
        maxHeight = 150;
    } else {
        maxHeight = 500;
    }
    return maxHeight;
}

// Set max width of pop-up window 
function setPopupMaxWidth(windowWidth) {
    var maxWidth;
    if (windowWidth < 450 ) {
        maxWidth = 240;
    } else {
        maxWidth = 300;
    }
    return maxWidth;
}

// return text value from domain
function returnDomainText(value) {
    var landUse = null;    
    switch (value) {
            case 1:
                landUse = 'Residential';
                break;
            case 2:
                landUse = 'Commercial';
                break;
            case 3:
                landUse = 'Institutional';
                break;
            case 4:
                landUse = 'Industrial';
                break;
            case 5:
                landUse = 'Agriculture';
                break;
            case 6:
                landUse = 'Woodland';
                break;
            default:            
                landUse = 'Other';
            }
        return landUse;	
}

// Convert JSON date format to plain language format
function convertJSONDateToString(jsonDate) {
    var shortDate = null;
    if (jsonDate) {
        var regex = /-?\d+/;
        var matches = regex.exec(jsonDate);
        var dt = new Date(parseInt(matches[0]));
        var month = dt.getMonth() + 1;
        var monthString = month > 9 ? month : '0' + month;
        var day = dt.getDate();
        var dayString = day > 9 ? day : '0' + day;
        var year = dt.getFullYear();
        shortDate = monthString + '-' + dayString + '-' + year;
    }
    return shortDate;
}

// test for null or empty string values
function testforFiedlValues(field) {
    var returnVal;
    if (field !== null && field !== '') {
        returnVal = field;
    } else {
        returnVal = 'N/A';
    }
    return returnVal;
}

// re-format numbers with commas
function returnNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}