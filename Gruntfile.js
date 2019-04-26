module.exports = function(grunt){
	// configurations
    grunt.initConfig({
		concat: {
			options: {
			  separator: '',
			},
			html: {
				src: ['components/html/head.html', 'components/html/nav.html', 'components/html/map.html', 'components/html/panels.html', 'components/html/error-modals.html', 'components/html/footer.html'],
				dest: 'components/html/combined/index.html'
		  	},
			css: {
				src: ['components/css/general.css', 'components/css/modals.css', 'components/css/panels.css', 'components/css/nav.css', 'components/css/map-controls.css', 'components/css/map-popups.css', 'components/css/media-query.css' ],
				dest: 'components/css/combined/style.css'
			 },
			js: {
				src: ['components/js/functions.js', 'components/js/map-functions.js', 'components/js/date-picker.js', 'components/js/map.js',  'components/js/layers.js', 'components/js/filter.js', 'components/js/search.js', 'components/js/geolocate.js','components/js/loading-screen.js'],
				dest: 'components/js/combined/app.js'
			}
		},
		cssmin: {
		  target: {
			files: [{
			  expand: true,
			  cwd: 'components/css/combined',
			  src: ['*.css'],
			  dest: 'build/css',
			  ext: '.min.css'
			}]
		  }
	    }
	});
    // load tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    // register tasks
	grunt.registerTask('default', ['concat', 'cssmin']);
};