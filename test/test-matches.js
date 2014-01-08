;(function(window) {
  "use strict";

  var $ = window.jQuery;
  var q = window.QUnit;

  var regexify = window.regexify;
  var matches = regexify.matches;


  q.module('Matches');

  q.test('test getMatches function', function() {
    expect(4);

    var inputRegex, inputText;
    var expectedOutput;
    var regexResult;

    q.deepEqual(matches.getMatches(null, 'a'), []);
    q.deepEqual(matches.getMatches(/a/, ''), []);

    inputRegex = /a/;
    inputText = 'aaaa';

    regexResult = ['a'];
    regexResult.index = 0;
    regexResult.input = inputText;

    expectedOutput = [ regexResult ];
    q.deepEqual(matches.getMatches(inputRegex, inputText), expectedOutput);

    inputRegex = /a/g;
    inputText = 'aaaa';
    expectedOutput = [];

    regexResult = ['a'];
    regexResult.index = 0;
    regexResult.input = inputText;
    expectedOutput.push(regexResult);

    regexResult.index = 1;
    expectedOutput.push(regexResult);

    regexResult.index = 2;
    expectedOutput.push(regexResult);

    regexResult.index = 3;
    expectedOutput.push(regexResult);

    q.deepEqual(matches.getMatches(inputRegex, inputText), expectedOutput);
  });

  q.test('test getMatchesTable function', function() {
    expect(2);

    q.equal(matches.getMatchesTable([]), '');

    var m = matches.getMatches(/a/g, 'aa');
    q.equal(
      matches.getMatchesTable(m),
      '<thead><tr><th>#</th><th>match</th></tr></thead><tr><td>1</td><td>a</td></tr><tr><td>2</td><td>a</td></tr>'
    );
  });
})(window);
