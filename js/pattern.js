(function(window, undefined) {
  "use strict";

  var regexify = window.regexify = window.regexify || {};
  var p = regexify.pattern = {};

  /**
   * @param {string} regexString
   * @param {string} flagsString
   *
   * @return {?RegExp}
   */
  p.convertToRegex = function(regexString, flagsString) {
    if( regexString.length === 0 ) { return null; }

    try {
      return new RegExp(regexString.replace(/\n/g, ''), flagsString);
    } catch( e ) {
      return null;
    }
  };
}(window));
