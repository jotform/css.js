var fullInspector = new cssjs();

QUnit.test('FullInspector Unit Tests', function(assert) {
    var expected = unitTest.stripComments.output;
    var result = fullInspector.stripComments(unitTest.stripComments.input);
    assert.deepEqual(result, expected, 'fi.prototype.stripComments : Strips comments from css string'); //assert 1

    expected = unitTest.findCorrespondingRule.output;
    result = fullInspector.findCorrespondingRule(unitTest.findCorrespondingRule.input1, unitTest.findCorrespondingRule.input2);
    assert.deepEqual(result, expected, 'fi.prototype.findCorrespondingRule : find rule by directive string'); //assert 2

    expected = unitTest.findBySelector.output;
    result = fullInspector.findBySelector(unitTest.findBySelector.input1, unitTest.findBySelector.input2);
    assert.deepEqual(result, expected, 'fi.prototype.findBySelector : find css object by selector string'); //assert 3

    expected = unitTest.findBySelector2.output;
    result = fullInspector.findBySelector(unitTest.findBySelector2.input1, unitTest.findBySelector2.input2);
    assert.deepEqual(result, expected, 'fi.prototype.findBySelector : should not compress @imports'); //assert 3

    expected = unitTest.cssDiff1.output;
    result = fullInspector.cssDiff(unitTest.cssDiff1.input1, unitTest.cssDiff1.input2);
    assert.deepEqual(result, expected, 'fi.prototype.cssDiff : css1\'s contains an updated value' ); //assert 4

    expected = unitTest.cssDiff2.output;
    result = fullInspector.cssDiff(unitTest.cssDiff2.input1, unitTest.cssDiff2.input2);
    assert.deepEqual(result, expected, 'fi.prototype.cssDiff : css1\'s contains a new directive and value' ); //assert 5

    expected = unitTest.cssDiff3.output;
    result = fullInspector.cssDiff(unitTest.cssDiff3.input1, unitTest.cssDiff3.input2);
    assert.deepEqual(result, expected, 'fi.prototype.cssDiff : css2\'s contains a directive that is not in css1, which means it is deleted in css1' ); //assert 6

    expected = unitTest.cssDiff4.output;
    result = fullInspector.cssDiff(unitTest.cssDiff4.input1, unitTest.cssDiff4.input2);
    assert.deepEqual(result, expected, 'fi.prototype.cssDiff : selectors are different, diff should be false' ); //assert 7

    expected = unitTest.cssDiff5.output;
    result = fullInspector.cssDiff(unitTest.cssDiff5.input1, unitTest.cssDiff5.input2);
    assert.deepEqual(result, expected, 'fi.prototype.cssDiff : Mix of some of above cssDiff tests' ); //assert 8

    expected = unitTest.parseRules1.output;
    result = fullInspector.parseRules(unitTest.parseRules1.input);
    assert.deepEqual(result, expected, 'fi.prototype.parseRules : parse css rules, containing duplicate directives' ); //assert 9
});

QUnit.test('Basic CSS parsing', function(assert) {
    var expected = JSON.parse(testData.veryBasicCSS.output);
    var parsed = fullInspector.parseCSS(testData.veryBasicCSS.input);
    console.log(expected, parsed);
    assert.deepEqual(parsed, expected, 'The simplest css possible, compressed'); //assert 1

    expected = JSON.parse(testData.basicCSS.output);
    parsed = fullInspector.parseCSS(testData.basicCSS.input);
    assert.deepEqual(parsed, expected, 'The simplest css possible, uncompressed'); //assert 2

    expected = JSON.parse(testData.basicCSS2.output); //adding comments should not change output
    parsed = fullInspector.parseCSS(testData.basicCSS2.input);
    assert.deepEqual(parsed, expected, 'Simple css with comments'); //assert 3


    expected = JSON.parse(testData.basicCSS3.output); //a More complex CSS example
    parsed = fullInspector.parseCSS(testData.basicCSS3.input);
    assert.deepEqual(parsed, expected, 'A More complex CSS example'); //assert 4

    expected = JSON.parse(testData.basicCSS4.output); //a More complex CSS example
    parsed = fullInspector.parseCSS(testData.basicCSS4.input);
    assert.deepEqual(parsed, expected, 'Simple css with multi-line value'); //assert 5

    expected = JSON.parse(testData.basicCSS5.output); //simple css with margin value is "*0"
    parsed = fullInspector.parseCSS(testData.basicCSS5.input);
    assert.deepEqual(parsed, expected, 'simple css with margin value is "*0'); //assert 6

    expected = JSON.parse(testData.basicCSS6.output); //stacked classes separate into 2 rules
    parsed = fullInspector.parseCSS(testData.basicCSS6.input);
    assert.deepEqual(parsed, expected, 'stacked css classes are separated correctly'); //assert 7
});
QUnit.test('Advanced CSS Parsing(support for media queries)', function(assert) {
    var expected = JSON.parse(testData.advCSS.output);
    var parsed = fullInspector.parseCSS(testData.advCSS.input);
    assert.deepEqual(parsed, expected, 'Basic CSS including only 1 media query'); //assert 1 for media queries


    expected = JSON.parse(testData.advCSS2.output);
    parsed = fullInspector.parseCSS(testData.advCSS2.input);
    assert.deepEqual(parsed, expected, '2 media queries'); //assert 2 for media queries

    //test a very complex css & media query mixup
    expected = JSON.parse(testData.advCSS3.output);
    parsed = fullInspector.parseCSS(testData.advCSS3.input);
    assert.deepEqual(parsed, expected, 'Complex css & media query mixup'); //assert 2 for media queries

    expected = JSON.parse(testData.advCSS4.output);
    parsed = fullInspector.parseCSS(testData.advCSS4.input);
    assert.deepEqual(parsed, expected, 'Simple @font-face containing css');

    expected = JSON.parse(testData.advCSS5.output);
    parsed = fullInspector.parseCSS(testData.advCSS5.input);
    assert.deepEqual(parsed, expected, 'Simple @font-face with multiline value containing css');

    expected = JSON.parse(testData.advCSS6.output);
    parsed = fullInspector.parseCSS(testData.advCSS6.input);
    assert.deepEqual(parsed, expected, 'Media query with a comment above it.');
});

QUnit.test('Template CSS Parsing (retains handlebars-style syntax in CSS)', function(assert) {
    var expected = JSON.parse(testData.tmplCSS.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS.input);
    assert.deepEqual(parsed, expected, 'basic CSS value assignment should have margin {{test}}');

    var expected = JSON.parse(testData.tmplCSS2.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS2.input);
    assert.deepEqual(parsed, expected, 'background image should have url with placeholder maintained');

    var expected = JSON.parse(testData.tmplCSS3.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS3.input);
    assert.deepEqual(parsed, expected, 'background image specified in url(\'\') should have url with placeholder maintained');

    var expected = JSON.parse(testData.tmplCSS4.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS4.input);
    assert.deepEqual(parsed, expected, 'background image specified in url("") should have url with placeholder maintained');

    var expected = JSON.parse(testData.tmplCSS5.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS5.input);
    assert.deepEqual(parsed, expected, 'basic CSS value assignment should maintain leading spacing');

    var expected = JSON.parse(testData.tmplCSS6.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS6.input);
    assert.deepEqual(parsed, expected, 'basic CSS value assignment should maintain surrounding spacing');

    var expected = JSON.parse(testData.tmplCSS7.output);
    var parsed = fullInspector.parseCSS(testData.tmplCSS7.input);
    assert.deepEqual(parsed, expected, 'basic CSS value assignment should maintain trailing spacing');
});

/*
	this tests convert css string to object, then to string, then to object and compares the last 2 objects
	to detect incostincies
*/
QUnit.test('CSS parse&toString equality tests', function(assert) {
    for (var i in testData) {
        var original = testData[i].input;
        var parsed = fullInspector.parseCSS(original);
        var converted = fullInspector.getCSSForEditor(parsed);
        var reparsed = fullInspector.parseCSS(converted);
        assert.deepEqual(reparsed, parsed, 'Test of each of above test cases');
    }
});

/*
	Test Cases for CSS diff tool
*/
QUnit.test('CSS Diff Tests', function(assert) {
    var css1 = JSON.parse(diffTestData.diffBasic.css1);
    var css2 = JSON.parse(diffTestData.diffBasic.css2);
    var diff = fullInspector.cssDiff(css1, css2);
    var expected = JSON.parse(diffTestData.diffBasic.diff)
    assert.deepEqual(diff, expected, 'Basic cssDiff');

    css1 = JSON.parse(diffTestData.diffBasic2.css1);
    css2 = JSON.parse(diffTestData.diffBasic2.css2);
    diff = fullInspector.cssDiff(css1, css2);
    expected = JSON.parse(diffTestData.diffBasic2.diff)
    assert.deepEqual(diff, expected, 'diff of 2 same css should return false');
});

/*
    Test Cases for Previous css diff bugs
*/
QUnit.test('CSS Diff Bug tests', function(assert) {

    for(var i = 0; i < cssDiffFailedValues.length; i++){
        var testData = cssDiffFailedValues[i];
        console.log('testData ',testData);
        var css1 = JSON.parse(testData.css1);
        console.log('css 1 ',css1);
        var css2 = JSON.parse(testData.css2);
        var diff = fullInspector.cssDiff(css1, css2);
        var expected = testData.output;
        assert.deepEqual(diff, expected, 'css diff bug test '+(i+1));
    }
});

/*
	Test Cases for Intelligent CSS Push
*/
QUnit.test('Intelligent CSS Push Tests', function(assert) {
    var styles = JSON.parse(cssIntelligentPushData.pushBasic.styles);
    var newStyle = JSON.parse(cssIntelligentPushData.pushBasic.newStyle);
    fullInspector.intelligentCSSPush(styles, newStyle);
    var expected = JSON.parse(cssIntelligentPushData.pushBasic.result);
    assert.deepEqual(styles, expected, 'Push CSS into empty CSS object');

    styles = JSON.parse(cssIntelligentPushData.pushBasic2.styles);
    newStyle = JSON.parse(cssIntelligentPushData.pushBasic2.newStyle);
    fullInspector.intelligentCSSPush(styles, newStyle);
    expected = JSON.parse(cssIntelligentPushData.pushBasic2.result);
    assert.deepEqual(styles, expected, 'Push CSS containing a new css directive to an existing CSS object');

    styles = JSON.parse(cssIntelligentPushData.pushBasic3.styles);
    newStyle = JSON.parse(cssIntelligentPushData.pushBasic3.newStyle);
    fullInspector.intelligentCSSPush(styles, newStyle);
    expected = JSON.parse(cssIntelligentPushData.pushBasic3.result);
    assert.deepEqual(styles, expected, 'Push media query CSS containing a new css directive to an existing media query CSS object');
});

QUnit.start();
