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
});