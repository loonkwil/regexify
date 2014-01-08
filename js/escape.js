(function(window) {
  "use strict";

  var regexify = window.regexify = window.regexify || {};

  /**
   * @param {string} str
   * @return {string}
   */
  regexify.escape = function(str) {
    return str.
      replace(/&/g, '&amp;').
      replace(/>/g, '&gt;').
      replace(/</g, '&lt;');
  };
}(window));
