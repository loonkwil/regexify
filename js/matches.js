(function(window) {
  "use strict";

  var regexify = window.regexify = window.regexify || {};
  var m = regexify.matches = {};

  var escape = regexify.escape;

  /**
   * @param {Array}
   * @return {integer}
   */
  var getMaxLength = function(arr) {
    var max = 0;
    arr.forEach(function(val) {
      if( max < val.length ) {
        max = val.length;
      }
    });

    return max;
  };


  /**
   * @param {?RegExp} regex
   * @param {string} text
   * @return {Array}
   */
  m.getMatches = function(regex, text) {
    if( text.length === 0 || regex === null ) {
      return [];
    }

    var matches = [];
    var match;

    if( !regex.global ) {
      match = regex.exec(text);

      return (match === null) ? [] : [ match ];
    }

    while ( null !== (match = regex.exec(text)) ) {
      if( match[0] === '' ) { regex.lastIndex += 1; }
      else {
        matches.push(match);
      }
    }

    return matches;
  };

  /**
   * @param {Array} matches
   * @return {string}
   */
  m.getMatchesTable = function(matches) {
    if( matches.length === 0 ) { return ''; }

    var i, j;
    var out = [];

    // Head
    out.push('<thead><tr><th>#</th><th>match</th>');

    var col = getMaxLength(matches);

    for ( i = 1; i < col; ++i ) {
      out.push('<th>$', i, '</th>');
    }
    out.push('</tr></thead>');

    // Body
    var l = matches.length;
    for ( i = 0; i < l; ++i ) {
      out.push('<tr><td>', i + 1, '</td>');

      var l2 = matches[i].length;
      for( j = 0; j < l2; ++j ) {
        var val = matches[i][j] || '';

        out.push('<td>', escape(val), '</td>');
      }

      out.push('</tr>');
    }

    return out.join('');
  };
}(window));
