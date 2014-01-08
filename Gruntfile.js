module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

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
    clean: {
      truncate: 'dist/*',
      cleanUp: {
        files: [
          {
            expand: true,
            nonull: true,
            cwd: 'dist/',
            src: [
              'bower_components/', 'node_modules/', 'test/',
              'css/*.css', '!css/*.min.css',
              'js/*.js', '!js/*.min.js',
            ]
          },
          {
            expand: true,
            nonull: true,
            cwd: 'dist/',
            filter: 'isFile',
            src: [ '*', '!package.json', '!index.html' ]
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          { src: ['**', '!dist'], dest: 'dist/' },
          {
            expand: true,
            nonull: true,
            flatten: true,
            src: 'bower_components/zeroclipboard/ZeroClipboard.swf',
            dest: 'dist/flash/'
          },
        ],
        options: {
          noProcess: '{node_modules,bower_components,img,test}/**/*',
          process: function (content, srcpath) {
            var ext = srcpath.split('.').pop();
            switch( ext ) {
            case 'html':
              // Remove DEBUG only code
              content = content.replace(
                /<!--\s*only\s*for\s*DEBUG\s*-->(?:.|\n)*?<!--\s*end\s*for\s*DEBUG\s*-->/img, ''
              );

              // Activate PRODUCTION only code
              content = content.replace(
                /<!--\s*only\s*for\s*PRODUCTION((?:.|\n)*?)end\s*for\s*PRODUCTION\s*-->/img, '$1'
              );

              break;
            case 'css':
            case 'js':
              content = content.replace(
                /\/\*\s*only\s*for\s*DEBUG\s*\*\/(?:.|\n)*?\/\*\s*end\s*for\s*DEBUG\s*\*\//img, ''
              );

              content = content.replace(
                /\/\*\s*only\sfor\sPRODUCTION((?:.|\n)*?)end\s*for\s*PRODUCTION\s*\*\//img, '$1'
              );

              break;
            }

            return content;
          }
        }
      }
    },
    uglify: {
      dist: {
        src: [
          'dist/bower_components/jquery/jquery.js',
          'dist/bower_components/bootstrap/js/button.js',
          'dist/bower_components/jquery.auto-grow/src/jquery.auto-grow.js',
          'dist/bower_components/regex-colorizer/regex-colorizer.js',
          'dist/bower_components/zeroclipboard/ZeroClipboard.js',
          'dist/js/escape.js',
          'dist/js/pattern.js',
          'dist/js/haystack.js',
          'dist/js/matches.js',
          'dist/js/regexify.js'
        ],
        dest: 'dist/js/base.min.js'
      }
    },
    cssmin: {
      dist: {
        src: [
          'dist/bower_components/bootstrap/dist/css/bootstrap.css',
          'dist/bower_components/jquery.auto-grow/src/auto-grow.css',
          'dist/css/style.css'
        ],
        dest: 'dist/css/main.min.css'
      }
    },
    htmlmin: {
      dist: {
        src: 'dist/index.html',
        dest: 'dist/index.html',
        options: {
          removeRedundantAttributes: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    }
  });

  // Task to run tests
  grunt.registerTask('test', ['qunit', 'jshint']);
  grunt.registerTask('dist', [
    'clean:truncate', 'copy', 'uglify', 'cssmin', 'htmlmin', 'clean:cleanUp'
  ]);
};
