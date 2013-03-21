(function(window, undefined) {
  "use strict";

  var regexify = window.regexify = window.regexify || {};
  var p = regexify.pattern = {};

  /**
   * @type {Object}
   */
  var settings = {
    validFlags: ['i', 'g', 'm']
  };


  /**
   * @const
   * @type {integer}
   */
  p.REGEX_ERROR = -1;

  /**
   * @const
   * @type {integer}
   */
  p.FLAGS_ERROR = -2;

  /**
   * @param {string} regexString
   * @param {string} flagsString
   *
   * @return {RegExp|integer}
   */
  p.convertToRegex = function(regexString, flagsString) {
    var l = flagsString.length;
    if ( l > 3 ) { return p.FLAGS_ERROR; }

    for ( var i = 0; i < l; ++i ) {
      if ( settings.validFlags.indexOf(flagsString[i]) === -1 ) {
        return p.FLAGS_ERROR;
      }
    }

    if( regexString.length === 0 ) { return p.REGEX_ERROR; }

    try {
      return new RegExp(regexString.replace(/\n/g, ''), flagsString);
    } catch( e ) {
      return p.REGEX_ERROR;
    }
  };
}(window));
