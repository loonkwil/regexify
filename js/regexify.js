(function(window, undefined) {
  "use strict";

  var $ = window.jQuery;
  var document = window.document;
  var localStorage = window.localStorage;
  var regexColorizer = window.RegexColorizer;

  var regexify = window.regexify = window.regexify || {};

  var regexifyPattern = regexify.pattern;
  var regexifyHaystack = regexify.haystack;
  var regexifyMatches = regexify.matches;


  // cache
  var $pattern, $flags, $copy, $haystack, $matches;

  var lastRegex,lastMatches;


  /**
   * @return {string}
   */
  var getRegexString = function() {
    return $pattern.find('textarea').val().replace(/\n/g, '');
  };

  /**
   * @param {string} str
   * @return {Object}
   */
  var setRegexString = function(str) {
    return $pattern.find('textarea').val(str);
  };

  /**
   * @return {string}
   */
  var getFlagsString = function() { return $flags.filter('.active').text(); };

  /**
   * @param {string} str
   * @return {Object}
   */
  var setFlagsString = function(str) {
    return $flags.each(function() {
      var $this = $(this);
      $this.toggleClass('active', str.indexOf($this.text()) !== -1);
    });
  };

  /**
   * @return {string}
   */
  var getHaystackString = function() { return $haystack.val(); };

  /**
   * @param {string} str
   * @return {Object}
   */
  var setHaystackString = function(str) { return $haystack.val(str); };


  var updateRegex = function() {
    lastRegex = regexifyPattern.convertToRegex(
      getRegexString(), getFlagsString()
    );

    // regex error
    $pattern.toggleClass('error', (lastRegex === null));
  };

  var updateMatches = function() {
    lastMatches = regexifyMatches.getMatches(lastRegex, getHaystackString());

    $matches.html(
      regexifyMatches.getMatchesTable(lastMatches)
    );
  };

  var saveState = function() {
    localStorage.regex = getRegexString();
    localStorage.flags = getFlagsString();
    localStorage.haystack = getHaystackString();
  };

  var loadSavedState = function() {
    if( !localStorage.hasOwnProperty('regex') ) { return; }

    setRegexString(localStorage.regex);
    setFlagsString(localStorage.flags);
    setHaystackString(localStorage.haystack);
  };


  $(function() {
    // warm up the cache
    $pattern = $('#pattern');
    $flags = $('#flags button');
    $copy = $('#copy');
    $haystack = $('#haystack');
    $matches = $('#matches');

    loadSavedState();

    $('body').removeAttr('hidden');

    // install auto growing textareas
    $pattern.find('textarea').autoGrow({
      highlight: function(str) {
        // updating regex
        updateRegex();

        // updating matches
        $haystack.trigger('input');

        // colorizing regex pattern
        str = regexColorizer.colorizeText(str);

        // showing error messages
        var errors = [];
        if( lastRegex === null ) {
          var pattern = /b class="err" title="([^"]+)"/g;

          var match;
          while ( null !== (match = pattern.exec(str)) ) {
            if( match[0] === '' ) { regex.lastIndex += 1; }
            else {
              errors.push(match[1]);
            }
          }
        }

        $('#regex-error').text(errors.join(', '));

        // the regexColorizer plugin will escape the "<", ">" and the "&"
        // character
        return str;
      }
    });

    $haystack.autoGrow({
      highlight: function(str) {
        updateMatches();

        return regexifyHaystack.highlightMatches(str, lastMatches);
      }
    });

    // ZeroClipboard install
    ZeroClipboard.setDefaults({
      moviePath: 'components/zeroclipboard/ZeroClipboard.swf',
      activeClass: 'active',
      hoverClass: 'hover'
    });

    var clip = new ZeroClipboard($copy);
    clip.on('dataRequested', function(client, args) {
      clip.setText('/' + getRegexString() + '/' + getFlagsString());
    });

    // events
    $flags.on('click', function flagsChangeEvent() {
      $(this).button('toggle');

      updateRegex();

      $haystack.trigger('input');
    });

    $(window).on('beforeunload', function beforeCloseEvent() {
      saveState();
    });
  });
})(window);
