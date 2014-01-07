module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-bump');

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
    }
  });

  // Task to run tests
  grunt.registerTask('test', 'qunit');
};
