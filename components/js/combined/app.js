'use strict';

// Make collapsed navigation scroll
function mobileNavScroll() {
    $(".navbar-collapse").css({maxHeight: $(window).height() - $(".navbar-header").height() + "px"});
}

/*** Event Listeners ***/
$(document).ready(function(){
    // control if filter widget appears on screen
    function controlFilterWidgetUI() {
        var width = $(window).width();
        var elements = [$('#panelFilter'), $('#collapseFilter')];    
        if ( width <= 767) {
            // add or remove class
            for (var i = 0; i < elements.length; i++) {
                elements[i].attr("aria-expanded", "false");            
                if (elements[i].hasClass("in")) {
                    elements[i].removeClass("in");
                }
            }                  
        }
    }
    // Attach search control for desktop or mobile
    function attachSearch() {
        var parentName = $(".geocoder-control").parent().attr("id"),
            geocoder = $(".geocoder-control"),
            width = $(window).width();
        if (width <= 767 && parentName !== "geocodeMobile") {
            geocoder.detach();
            $("#geocodeMobile").append(geocoder);
        } else if (width > 767 && parentName !== "geocode"){
            geocoder.detach();
            $("#geocode").append(geocoder);
        }
    }
    // zoom to muni widget
	$("#selectMuni").on("change", function(e) {
        zoomToMuni($(this).val());
    }); 
    // call functions    
    mobileNavScroll();
    controlFilterWidgetUI();    
    attachSearch();      
    // Search
    var input = $(".geocoder-control-input");
    input.focus(function(){
        $("#panelSearch .panel-body").css("height", "150px");
    });
    input.blur(function(){
        $("#panelSearch .panel-body").css("height", "auto");
    });    
    // resize event
    $(window).resize(function() {
        mobileNavScroll();
        attachSearch();        
    });
});//  Basemap Changer
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
}/*** Date Picker ***/
$( function() {
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
        $('#dateErrorModal').modal('show');
      } 
      return date;
    }    
    var dateFormat = "mm/dd/yy",
      from = $( "#fromDate" )
        .datepicker({
          defaultDate: "0",
          changeMonth: true,
          numberOfMonths: 1
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#toDate" ).datepicker({
        defaultDate: "0",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });    
  });// viewport
// width
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// height
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// window
const windowArea = windowWidth * windowHeight;
// center coords
const homeCoords = [40.15, -77.25];

/*** Map & Controls ***/
// PA State Plane South (ft) projection
const spcPACrs = new L.Proj.CRS('EPSG:2272', '+proj=lcc +lat_1=40.96666666666667 +lat_2=39.93333333333333 +lat_0=39.33333333333334 +lon_0=-77.75 +x_0=600000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs',  {
    origin: [-1.192142E8, 1.461669E8],
    resolutions: [
      260.41666666666663,
      86.80555555555556,
      43.40277777777778,
      20.833333333333332,
      10.416666666666666,
      6.944444444444444,
      4.166666666666666,
      2.083333333333333,
      1.0416666666666665,
      0.5208333333333333
    ]
});

const map = L.map('map', {
   center: homeCoords,
   zoom: 0,
   zoomControl: false,
   crs: spcPACrs,
   minZoom: 0,
   maxZoom: 8
});

// Zoom Home Control
const zoomHomeControl = L.Control.zoomHome({
    position: 'topleft',
    zoomHomeTitle: 'Full map extent',
    homeCoordinates: homeCoords,
    homeZoom: 0    
}).addTo(map);// 2018 Imagery - cached map service
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
planSubmissions.bindPopup(function(evt, layer) {    
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
}// clear filter
function clearFilter() {
    planSubmissions.setWhere("");
    $('#panelFilter').collapse("hide");
}

// set filter
function setFilter() {
    // beginning date
    var from = $('#fromDate').val();     
    // ending date
    var to = $('#toDate').val();
    // where clause for filter
    var where_clause = '"DATE" >= date ' + "'" + from + "'" + ' AND "DATE" <= date' + " '" + to + "'";  
    // apply filter
    planSubmissions.setWhere(where_clause);    
    // get count of features
    // if no features exist, add message
    // call clearFilter()
    // hide panel
    $('#panelFilter').collapse("hide");
}

// add event listeners
$('#setFilter').click(setFilter);
$('#clearFilter').click(clearFilter);// CCPA Composite Locatoer
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
});/*********************************************************************
* Name: Leaflet Locate Me Widget
* Version: 1.0
* Created by: Patrick McKinney, Cumberland County GIS
* Notes: for use with Leaflet Locate Control version 0.49
**********************************************************************/

function locateControl() {
    'use strict';
    
    var locateControl = L.control.locate({
      position: "topleft",
      drawCircle: true,
      follow: false,
      setView: true,
      keepCurrentZoomLevel: false,
      markerStyle: {
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8
      },
      circleStyle: {
        weight: 1,
        clickable: false
      },
      icon: "fa fa-location-arrow",
      iconLoading: "fa fa-spinner fa-spin",
      metric: false,
      onLocationError: function(err) {
          alert(err.message);
      },
      onLocationOutsideMapBounds: function(context) {
          alert(context.options.strings.outsideMapBoundsMsg);
      },
      strings: {
        title: "Find my location",
        popup: "You are within {distance} {unit} from this point",
        outsideMapBoundsMsg: "You seem to be located outside the boundaries of the map"
      },
      locateOptions: {
        maxZoom: 18, 
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    }).addTo(map);
}/*** Remove loading screen after services loaded ***/
const loadScreenTimer = window.setInterval(function() { 
    let backCover = $('#back-cover'),
       imagery2018Loaded = imagery2018.options.isLoaded,
       roadsMuniLoaded = roadsMunicipality.options.isLoaded,
       planReviewLoaded = planSubmissions.options.isLoaded;
    
    if (imagery2018Loaded && roadsMuniLoaded && planReviewLoaded) {
        // remove loading screen
        window.setTimeout(function() {
        backCover.fadeOut('slow');         
       }, 4000);
        
        // clear timer
        window.clearInterval(loadScreenTimer);        
    } else {
      console.log('layers still loading');    
    }
}, 2000);   

// Remove loading screen when warning modal is closed
$('#layerErrorModal').on('hide.bs.modal', function(e) {
   // remove loading screen
   $('#back-cover').fadeOut('slow');
   // clear timer
   window.clearInterval(loadScreenTimer);     
});