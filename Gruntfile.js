module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

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
      beforeAll: 'releases/*',
      afterWeb: {
        files: [
          {
            expand: true,
            nonull: true,
            cwd: 'releases/web/',
            src: [
              'bower_components/', 'node_modules/', 'test/',
              'css/*.css', '!css/*.min.css',
              'js/*.js', '!js/*.min.js',
              'img/*.icns'
            ]
          },
          {
            expand: true,
            nonull: true,
            cwd: 'releases/web/',
            filter: 'isFile',
            src: [ '*', '!package.json', '!index.html' ]
          }
        ]
      },
      afterNodeWebkit: 'releases/web/package.json'
    },
    copy: {
      dist: {
        files: [
          { src: ['**', '!releases', '!cache/**'], dest: 'releases/web/' },
          {
            expand: true,
            nonull: true,
            flatten: true,
            src: 'bower_components/zeroclipboard/ZeroClipboard.swf',
            dest: 'releases/web/flash/'
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
          'releases/web/bower_components/jquery/jquery.js',
          'releases/web/bower_components/bootstrap/js/button.js',
          'releases/web/bower_components/jquery.auto-grow/src/jquery.auto-grow.js',
          'releases/web/bower_components/regex-colorizer/regex-colorizer.js',
          'releases/web/bower_components/zeroclipboard/ZeroClipboard.js',
          'releases/web/js/escape.js',
          'releases/web/js/pattern.js',
          'releases/web/js/haystack.js',
          'releases/web/js/matches.js',
          'releases/web/js/regexify.js'
        ],
        dest: 'releases/web/js/base.min.js'
      }
    },
    cssmin: {
      dist: {
        src: [
          'releases/web/bower_components/bootstrap/dist/css/bootstrap.css',
          'releases/web/bower_components/jquery.auto-grow/src/auto-grow.css',
          'releases/web/css/style.css'
        ],
        dest: 'releases/web/css/main.min.css'
      }
    },
    htmlmin: {
      dist: {
        src: 'releases/web/index.html',
        dest: 'releases/web/index.html',
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
    },
    nodewebkit: {
      src: ['releases/web/**/*', '!releases/web/flash/**', '!**/*.ico'],
      options: {
        build_dir: './',
        win: true,
        mac: true,
        linux32: true,
        linux64: true,
        mac_icns: 'img/logo.icns'
      }
    }
  });

  // Task to run tests
  grunt.registerTask('test', ['qunit', 'jshint']);
  grunt.registerTask('dist', [
    'clean:beforeAll', 'copy', 'uglify', 'cssmin', 'htmlmin', 'clean:afterWeb',
    'nodewebkit', 'clean:afterNodeWebkit'
  ]);
};
