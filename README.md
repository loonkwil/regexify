# Regexify

[![Build Status](https://travis-ci.org/loonkwil/regexify.png)](https://travis-ci.org/loonkwil/regexify)

Live JavaScript regex tester

## Install dependencies

Use the [gh-pages](https://github.com/loonkwil/regexify/tree/gh-pages) branch
if you don't want to install anything.

Requirements: [NodeJs](http://nodejs.org), [Bower](http://bower.io)

 1. `bower install`
 2. `npm install`

## Distributing

Requirements: [Grunt](http://gruntjs.com)

For desktop: `grunt dist:desktop`  
For web: `grunt dist:web`  
For both: `grunt dist:all`  

For bumping the version number in the package.json and the bower.json file:
`grunt bump` (it will also create a commit, about this two changes)

## Run the tests

Requirements: [Grunt](http://gruntjs.com)

`npm test` or `grunt test`
