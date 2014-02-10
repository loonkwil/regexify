module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask(
    'deactivate-dev-only-code', 'Deactivate development only code', function() {
      var counter = 0;
      var replacer = function() {
        ++counter;
        return '';
      };

      this.files.forEach(function(files) {
        var concatenated = files.src.
          // Remove nonexistent files
          filter(function(oneFile) {
            if( !grunt.file.exists(oneFile) ) {
              grunt.log.warn('Source file "' + oneFile + '" not found.');
              return false;
            }
            return true;
          }).
          map(function(oneFile) {
            var content = grunt.file.read(oneFile);
            var ext = oneFile.split('.').pop();

            switch( ext ) {
            case 'html':
              content = content.replace(
                /<!--\s*only\s*for\s*DEBUG\s*-->(?:.|\n)*?<!--\s*end\s*for\s*DEBUG\s*-->/img,
                replacer
              );
              break;
            case 'css':
            case 'js':
              content = content.replace(
                /\/\*\s*only\s*for\s*DEBUG\s*\*\/(?:.|\n)*?\/\*\s*end\s*for\s*DEBUG\s*\*\//img,
                replacer
              );
              break;
            }

            return content;
          }).
          join('\n');

        grunt.file.write(files.dest, concatenated);
      });

      grunt.log.ok(counter + ' code blocks was deactivated.');
    }
  );
};
