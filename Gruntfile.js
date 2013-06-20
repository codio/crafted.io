module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          'css/main.css': 'less/main.less'
        },
        options: {
          paths: [ 'less/basics', 'less/pages', 'less/parts' ]
        }
      },
      production: {
        files: {
          'css/main.css': 'less/main.less'
        },
        options: {
          paths: [ 'less/basics', 'less/pages', 'less/parts' ],
          yuicompress: true
        }
      }
    },

    watch: {
      files: 'less/**/*.less',
      tasks: ['less:development']
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less:development']);
  grunt.registerTask('build', ['less:production']);

};