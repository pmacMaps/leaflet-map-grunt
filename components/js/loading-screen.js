/*** Remove loading screen after services loaded ***/
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