module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
  grunt.initConfig({
    qunit: {
      files: ['test/index.html']
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        push: false
      }
    },
    uglify: {
      dist: {
        files: {
          'js/packed/base.min.js': [
            'bower_components/jquery/jquery.js',
            'bower_components/bootstrap/js/button.js',
            'bower_components/jquery.auto-grow/src/jquery.auto-grow.js',
            'bower_components/regex-colorizer/regex-colorizer.js',
            'bower_components/zeroclipboard/ZeroClipboard.js',
            'js/escape.js',
            'js/pattern.js',
            'js/haystack.js',
            'js/matches.js',
            'js/regexify.js'
          ]
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/packed/main.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/jquery.auto-grow/src/auto-grow.css',
            'css/style.css'
          ]
        }
      }
    }
  });

  // Task to run tests
  grunt.registerTask('test', 'qunit');
  grunt.registerTask('dist', ['uglify:dist', 'cssmin']);
};
