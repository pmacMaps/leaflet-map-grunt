export default function(grunt) {
	// configurations
    grunt.initConfig({
		// combine files together
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
        // minify production index.html file
		htmlmin: {
			dist: {
			  options: {
				removeComments: true,
				collapseWhitespace: true
			  },
              // ouput dir : input dir
			  files: {
				'build/index.html' : 'components/html/combined/index.html'
				}
			}
		},
        // minify production css file
		cssmin: {
            options: {
              sourceMap: true
          },
		  target: {
			files: [{
			  expand: true,
			  cwd: 'components/css/combined',
			  src: ['*.css'],
			  dest: '/build/assets/css',
			  ext: '.min.css'
			}]
		  }
	    },
        // minify production js file
		uglify: {
			options: {
				mangle: false,
				sourceMap: true,
        		sourceMapName: '/build/assets/js/app.map'
			},
			my_target: {
			  files: {
                // ouput dir : input dir
				'/build/assets/js/app.min.js' : ['components/js/combined/app.js']
			  }
			}
  		},
        // run tasks when files change
		watch: {
			html: {
				files: 'components/html/*.html',
				tasks: ['concat:html','htmlmin']
			},
			css: {
				files: 'components/css/*.css',
				tasks: ['concat:css','cssmin']
			},
			js: {
				files: 'components/js/*.js',
				tasks: ['concat:js','uglify']
			}
		},
        // spin up a local server to test changes
		connect: {
			server: {
			  options: {
				base: 'build'
			  }
			}
  		}
	});
    // load tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-babel');
    // register tasks
	grunt.registerTask('default', ['connect','watch']);
};