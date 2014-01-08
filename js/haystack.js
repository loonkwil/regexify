(function(window) {
  "use strict";

  var regexify = window.regexify = window.regexify || {};
  var h = regexify.haystack = {};

  var escape = regexify.escape;


  /**
   * @param {string} str
   * @param {Array.<Object>} matches
   *
   * @return {string}
   */
  h.highlightMatches = function(str, matches) {
    var out = [];

    var l = matches.length;
    var start, end, lastEnd;
    start = end = lastEnd = 0;

    for ( var i = 0; i < l; ++i ) {
      var result = matches[i];
      var text = result[0];

      start = result.index;
      end = start + text.length;

      out.push(
        escape(str.slice(lastEnd, start)), '<mark>', escape(text), '</mark>'
      );

      lastEnd = end;
    }

    out.push(escape(str.slice(lastEnd)));

    return out.join('');
  };
}(window));
