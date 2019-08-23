module.exports = function(grunt){
	// configurations
    grunt.initConfig({
		// combine files together
        concat: {
			options: {
			  separator: '',
			  stripBanners: true			  
			},
			esri_leaflet: {
				src: ['plugins/esri/esri-leaflet/esri-leaflet.js', 'plugins/esri/esri-leaflet-renderers/esri-leaflet-renderers.js', 'plugins/esri/esri-leaflet-geocoder/esri-leaflet-geocoder.js'],
				dest: 'bundled/js/esri.leaflet.plugins.js'
			  },
			leaflet_plugins: {
				src: ['plugins/leaflet-zoomhome/leaflet.zoomhome.js', 'plugins/leaflet-fullscreen/Leaflet.fullscreen.js', 'plugins/leaflet-locate/L.Control.Locate.min.js'],
				dest: 'bundled/js/leaflet.plugins.js'
			},
			css_general: {
				src: ['plugins/leaflet-zoomhome/leaflet.zoomhome.css', 'plugins/leaflet-fullscreen/leaflet.fullscreen.css', 'plugins/leaflet-locate/L.Control.Locate.css', 'plugins/esri/esri-leaflet-geocoder/esri-leaflet-geocoder.css' ],
				dest: 'bundled/css/leaflet-plugins.css'
			 },
			css_calcite: {
				src: ['plugins/esri/calcite-maps/calcite-maps-layout.css', 'plugins/esri/calcite-maps/calcite-maps-style.css', 'plugins/esri/calcite-maps/calcite-maps-esrileaflet.css', 'plugins/esri/calcite-maps/theme-inline-zoom.css', 'plugins/esri/calcite-maps/theme-jumbo-title.css', 'plugins/esri/calcite-maps/theme-side-nav.css'],
				dest: 'bundled/css/esri-calcite.css'
			}			
		},
        // minify production css file
		cssmin: {
            options: {
              sourceMap: false
          },   
		  target: {
			files: [{
			  expand: true,
			  cwd: 'bundled/css',
			  src: ['*.css'],
			  dest: 'bundled/production/css/',
			  ext: '.min.css'
			}]
		  }
	    },
        // minify production js file
		uglify: {
			options: {
				mangle: false,
				sourceMap: false        		
			},
			my_target: {
			  files: {
                // ouput dir : input dir    
				'bundled/production/js/leaflet.plugins.min.js' : ['bundled/js/leaflet.plugins.js'],
				'bundled/production/js/esri.leaflet.plugins.min.js' : ['bundled/js/esri.leaflet.plugins.js']
			  }
			}
  		}        
	});

    // load tasks
	grunt.loadNpmTasks('grunt-contrib-concat');	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');    
};