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
  var $pattern, $flags, $haystack, $matches;

  var lastRegex;
  var lastMatches;

  var updateRegex = function() {
    var regexString = $pattern.val();
    var flagsString = $flags.val().toLowerCase();

    lastRegex = regexifyPattern.convertToRegex(regexString, flagsString);

    // flags error
    $flags.toggleClass('err', lastRegex === regexifyPattern.FLAGS_ERROR);

    // regex pattern error
    $pattern.
      closest('#pattern').
      toggleClass('err', (typeof lastRegex !== 'object'));
  };

  var updateMatches = function() {
    var text = $haystack.val();

    lastMatches = ( typeof lastRegex === 'object' ) ? regexifyMatches.getMatches(lastRegex, text) : [];

    $matches.html(
      regexifyMatches.getMatchesTable(lastMatches)
    );
  };

  var saveState = function() {
    localStorage.regex = $pattern.val();
    localStorage.flags = $flags.val();
    localStorage.haystack = $haystack.val();
  };

  var loadSavedState = function() {
    if( localStorage.hasOwnProperty('regex') ) {
      $pattern.val(localStorage.regex);
      $flags.val(localStorage.flags);
      $haystack.val(localStorage.haystack);
    }
  };


  $(function() {
    // warm up the cache
    $matches = $('#matches');
    $flags = $('input[name="flags"]');
    $pattern = $('#pattern textarea');
    $haystack = $('#haystack');

    loadSavedState();

    $('body').removeAttr('hidden');

    // replace new line character with "\n"
    $pattern.on('input', function() {
      var val = $pattern.val();
      $pattern.val(val.replace(/\n/g, '\\n'));
    });

    $flags.on('input', function() {
      updateRegex();
      $haystack.trigger('input');
    });

    $(window).on('beforeunload', function() {
      saveState();
    });

    $pattern.autoGrow(function(str) {
      updateRegex();
      $haystack.trigger('input');

      return regexColorizer.colorizeText(str);
    });

    $haystack.autoGrow(function(str) {
      updateMatches();

      return regexifyHaystack.highlightMatches(str, lastMatches);
    });
  });
})(window);
