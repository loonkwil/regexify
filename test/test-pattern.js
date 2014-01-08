;(function(window) {
  "use strict";

  var $ = window.jQuery;
  var q = window.QUnit;

  var regexify = window.regexify;
  var pattern = regexify.pattern;


  q.module('Pattern');

  q.test('test convertToRegex function', function() {
    expect(7);

    q.strictEqual(pattern.convertToRegex('[', ''), null);
    q.strictEqual(pattern.convertToRegex('abcd', 'q'), null);
    q.deepEqual(pattern.convertToRegex('abcd', ''), /abcd/);
    q.deepEqual(pattern.convertToRegex('abcd', 'i'), /abcd/i);
    q.deepEqual(pattern.convertToRegex('abcd', 'g'), /abcd/g);
    q.deepEqual(pattern.convertToRegex('abcd', 'm'), /abcd/m);
    q.deepEqual(pattern.convertToRegex('abcd', 'img'), /abcd/img);
  });
})(window);
