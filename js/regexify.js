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
  var $help, $flagsCopy, $patternCopy, $haystackCopy, $pattern, $flags, $haystack, $matches;

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

  var hideHelp = function() {
    var helpHeight = $help.outerHeight(true);

    if( $(document).height() - $(window).height() > helpHeight ) {
      window.setTimeout(function() {
        $('html,body').animate({scrollTop: helpHeight}, 300);
      }, 300);
    }
  };

  var syncFlags = function() {
    var flags = $flags.val().toLowerCase();
    var global = flags.search('g') !== -1;

    $flagsCopy.text(flags);

    $help.find('#global-on').attr('hidden', !global);
    $help.find('#global-off').attr('hidden', global);
  };

  var syncPattern = function() {
    $patternCopy.text(
      $pattern.find('textarea').val().replace(/\n/g, '')
    );
  };

  var syncHaystack = function() {
    var maxLength = 20;
    var text = $haystack.val();

    var shortText = text.
      substr(0, maxLength).
      trimRight().
      replace(/\n/g, '\\n').
      replace(/'/g, '\\\'');

    if( text.length > maxLength ) {
      shortText += '...';
    }

    $haystackCopy.text(shortText);
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
    $help = $('#help');
    $patternCopy = $('#pattern-copy');
    $flagsCopy = $('#flags-copy');
    $haystackCopy = $('#haystack-copy');
    $pattern = $('#pattern');
    $flags = $('input[name="flags"]');
    $haystack = $('#haystack');
    $matches = $('#matches');

    loadSavedState();
    syncFlags();

    $('body').removeAttr('hidden');

    // install auto growing textareas
    $pattern.find('textarea').autoGrow(function(str) {
      updateRegex();

      syncPattern();

      $haystack.trigger('input');

      return regexColorizer.colorizeText(str);
    });

    $haystack.autoGrow(function(str) {
      updateMatches();

      syncHaystack();

      return regexifyHaystack.highlightMatches(str, lastMatches);
    });

    // events
    $pattern.find('textarea').on('click', function focusEvent() {
      hideHelp();
    });

    $flags.on('input', function flagsChangeEvent() {
      updateRegex();

      syncFlags();

      $haystack.trigger('input');
    });

    $(window).on('beforeunload', function beforeCloseEvent() {
      saveState();
    });

    // hiding the help message
    hideHelp();
  });
})(window);
