module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask(
    'activate-prod-only-code', 'Activate production only code', function() {
      var counter = 0;
      var replacer = function(match, p1) {
        ++counter;
        return p1;
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
                /<!--\s*only\s*for\s*PRODUCTION((?:.|\n)*?)end\s*for\s*PRODUCTION\s*-->/img,
                replacer
              );
              break;
            case 'css':
            case 'js':
              content = content.replace(
                /\/\*\s*only\sfor\sPRODUCTION((?:.|\n)*?)end\s*for\s*PRODUCTION\s*\*\//img,
                replacer
              );
              break;
            }

            return content;
          }).
          join('\n');

        grunt.file.write(files.dest, concatenated);
      });

      grunt.log.ok(counter + ' code blocks was activated.');
    }
  );
};
