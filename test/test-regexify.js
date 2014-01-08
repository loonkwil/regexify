;(function(window) {
  "use strict";

  var document = window.document;
  var $ = window.jQuery;
  var q = window.QUnit;

  var regexify = window.regexify;


  q.module('Helpers');

  q.test('test escape function', function() {
    expect(1);

    var input = '<b>ab&cd</b>"\'őű<<()"';
    var expectedOutput = function() {
      var node = document.createElement('p');
      node.textContent = input;
      return node.innerHTML;
    }();

    q.equal(regexify.escape(input), expectedOutput);
  });
})(window);
