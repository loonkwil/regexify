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
    var regexString = $pattern.find('textarea').val();
    var flagsString = $flags.val().toLowerCase();

    lastRegex = regexifyPattern.convertToRegex(regexString, flagsString);

    // flags error
    $flags.toggleClass('err', lastRegex === regexifyPattern.FLAGS_ERROR);

    // regex pattern error
    $pattern.toggleClass('err', (typeof lastRegex !== 'object'));
  };

  var updateMatches = function() {
    var text = $haystack.val();

    lastMatches = ( typeof lastRegex === 'object' ) ? regexifyMatches.getMatches(lastRegex, text) : [];

    $matches.html(
      regexifyMatches.getMatchesTable(lastMatches)
    );
  };

  var saveState = function() {
    localStorage.regex = $pattern.find('textarea').val();
    localStorage.flags = $flags.val();
    localStorage.haystack = $haystack.val();
  };

  var loadSavedState = function() {
    if( localStorage.hasOwnProperty('regex') ) {
      $pattern.find('textarea').val(localStorage.regex);
      $flags.val(localStorage.flags);
      $haystack.val(localStorage.haystack);
    }
  };


  $(function() {
    // warm up the cache
    $pattern = $('#pattern');
    $flags = $('input[name="flags"]');
    $haystack = $('#haystack');
    $matches = $('#matches');

    loadSavedState();

    $('body').removeAttr('hidden');

    // install auto growing textareas
    $pattern.find('textarea').autoGrow({
      highlight: function(str) {
        updateRegex();

        $haystack.trigger('input');

        // the regexColorizer plugin will escape the "<", ">" and the "&"
        // character
        return regexColorizer.colorizeText(str);
      }
    });

    $haystack.autoGrow({
      highlight: function(str) {
        updateMatches();

        return regexifyHaystack.highlightMatches(str, lastMatches);
      }
    });

    // events
    $flags.on('input', function flagsChangeEvent() {
      updateRegex();

      $haystack.trigger('input');
    });

    $(window).on('beforeunload', function beforeCloseEvent() {
      saveState();
    });
  });
})(window);
