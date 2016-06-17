module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
            	options: {
          			separator: ';',
        		},
        		src: ['Google API/js/libs/lodash/.js', 'Google API/js/libs/*.js', 'Google API/js/src//script.js'],
        		dest: 'Google API/js/dist/script.min.js'
    		},
            css : {
                src: ['Google API/css/src/*.css'],
                dest: 'Google API/css/dist/style.min.css'
            }
        },

        uglify: {
            js: {
                src: 'Google API/js/dist/script.min.js',
                dest: 'Google API/js/dist/script.min.js'
            }
        },

        cssmin: {
            css:{
                src: 'Google API/css/dist/style.min.css',
                dest: 'Google API/css/dist/style.min.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat','uglify', 'cssmin']);

};
