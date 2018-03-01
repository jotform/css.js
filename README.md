css.js [![Build Status](https://travis-ci.org/jotform/css.js.svg)](https://travis-ci.org/jotform/css.js)
======

A lightweight, battle tested, fast, css parser in JavaScript


Why?
=====
Please read the story behind it [here]
[here]: https://medium.com/jotform-form-builder/writing-a-css-parser-in-javascript-3ecaa1719a43

Demo
======

Check out [plunker demo]

[plunker demo]: http://embed.plnkr.co/qMRJpJ92BHNrJuCnbRFB/preview

Development
======

Following commands will prepare development enviroment by installing dependencies:

```
npm install
```

And to execute unit tests and produce css.min.js, execute

```
grunt
```

How To Install
======

```
npm install jotform-css.js
```

How To Use
======

On the browser
------

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


On the server
------


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
