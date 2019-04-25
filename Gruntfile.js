module.exports = function(grunt){
	grunt.initConfig({
		concat: {
			options: {
			  separator: '',
			},
			html: {
				src: ['components/html/*.html'],
				dest: 'components/html/combined/index.html'
		  	},
			css: {
				src: ['components/css/*.css'],
				dest: 'components/css/combined/style.css'
			 },
			js: {
				src: ['components/js/*.js'],
				dest: 'components/js/combined/app.js'
			}
		}	  	
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat']);
};