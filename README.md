Jotform css.js [![Build Status](https://travis-ci.org/jotform/css.js.svg)](https://travis-ci.org/jotform/css.js)
================================================================================================================

A lightweight, battle tested, fast, css parser in JavaScript

[![NPM](https://nodei.co/npm/jotform-css.js.png)](https://nodei.co/npm/jotform-css.js/)

Why?
=====
Please read the [story behind css.js](https://medium.com/jotform-form-builder/writing-a-css-parser-in-javascript-3ecaa1719a43)


Demo
======

Check out
[plunker demo](http://embed.plnkr.co/qMRJpJ92BHNrJuCnbRFB/preview)

Development
======

Prepare development enviroment by installing dependencies:

```
npm install
```

Execute unit tests and produce css.min.js, execute

```
grunt
```

TypeScript Types
----------------
```
npm install @types/jotform-css.js
```

How to Use
===========

In browser
----------

Simply parse css string, and log the output

```html
<script type="text/javascript" src="css.min.js"></script>
<script type="text/javascript">
  var cssString = ' .someSelector { margin:40px 10px; padding:5px}';
  //initialize parser object
  var parser = new cssjs();
  //parse css string
  var parsed = parser.parseCSS(cssString);

  console.log(parsed);
</script>
```


Node/Modular-based
------------------


```js
var cssString = ' .someSelector { margin:40px 10px; padding:5px}';
//require parser constructor
var cssjs = require("./css.js");
//initialize parser object
var parser = new cssjs.cssjs();
//parse css string
var parsed = parser.parseCSS(cssString);

console.log(parsed);
```
