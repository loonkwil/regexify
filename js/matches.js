(function(window, undefined) {
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
   * @param {integer} n
   * @return {string}
   */
  var getGroupClass = function(n) {
    if( n === 0 ) { return ''; }

    return 'g' + (((n-1) % 5) + 1);
  };


  /**
   * @param {RegExp} regex
   * @param {string} text
   * @return {Array}
   */
  m.getMatches = function(regex, text) {
    if( text.length === 0 ) {
      return [];
    }

    var matches = [];
    var match;

    if( !regex.global ) {
      match = regex.exec(text);

      return [ match ] || [];
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

    var out = ['<table><thead><tr><td></td><td>match</td>'];

    var col = getMaxLength(matches);

    var i, j;
    for ( i = 1; i < col; ++i ) {
      out.push('<td class="', getGroupClass(i), '">$', i, '</td>');
    }
    out.push('</tr></thead>');

    var l = matches.length;
    for ( i = 0; i < l; ++i ) {
      out.push('<tr><td>', i + 1, '. </td>');

      var l2 = matches[i].length;
      for( j = 0; j < l2; ++j ) {
        var val = escape(matches[i][j]) || '';

        out.push('<td class="', getGroupClass(j), '">', val, '</td>');
      }

      out.push('</tr>');
    }

    out.push('</table>');

    return out.join('');
  };
}(window));
