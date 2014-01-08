;(function(window) {
  "use strict";

  var $ = window.jQuery;
  var q = window.QUnit;

  var regexify = window.regexify;
  var haystack = regexify.haystack;


  q.module('Haystack');

  q.test('test highlightMatches function', function() {
    expect(3);

    q.equal(haystack.highlightMatches('abcd', []), 'abcd');
    q.equal(haystack.highlightMatches('', []), '');
    q.equal(
      haystack.highlightMatches(
        'aaaabbbbccccdddd', [{ 0: 'aa', index: 1 }, { 0: 'c', index: 8 }]
      ),
      'a<mark>aa</mark>abbbb<mark>c</mark>cccdddd'
    );
  });
})(window);
