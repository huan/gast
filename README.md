# GasT - Google Apps Script Testing-framework

GasT is a [TAP](http://testanything.org/)-compliant testing framework for Google Apps Script(GAS). It provides a easy way to verify that the GAS programs you write behave as expected.

Github: https://github.com/zixia/gast

A GasT unit testing file is a Javascript which defining GAS unit testing cases. Under the hood, each GAS test case is just a function with a description, and output as TAP format.

```javascript
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

var test = new GasTap()

function gast() {
  test('do calculation right', function (t) {    
  	var i = 3 + 4
    t.equal(i, 7, 'calc 3 + 4 = 7 right')
  })

  test('Spreadsheet exist', function (t) {
    var url = 'https://docs.google.com/spreadsheets/d/1_KRAtoDz2Pdcj9IPZI007I_gMzRyfmXf7gicgxVwYJc/edit#gid=0'
	  var ss = SpreadsheetApp.openByUrl(url)
    t.ok(ss, 'open spreadsheet successful')
  })

  test.finish()
}
```

GasT is most useful when testing javascript running on Google Apps Script environment. if you are running out of GAS, there's other TAP testing framework as well, such as [TAPE - a tap-producing test harness for node and browsers](https://github.com/substack/tape).

Test cases consist of Google Apps Scripts. 

## About TAP

TAP is Test Anything Protocol, as understood by Perl 1.0's t/TEST on year 1988.
```
commit 840163baa12f7970131f7841c479bccf5be40ba9
Author: Larry Wall <lwall@jpl-devvax.jpl.nasa.gov>
Date:   Sat Jan 30 23:00:00 1988 +0000
```

Version 2 implemented on year 1996.
```
commit 4bce96efdcaa480e392138e10166c92c5fc5f22c
Author: Perl 5 Porters <perl5-porters@africa.nicoh.com>
Date:   Fri Feb 2 18:52:27 1996 -0800
```

More TAP History: http://testanything.org/history.html

Today, TAP is widely supported as unit testing framework for test harness or automated test framework, in almost all languages. [TAP has Producers in](http://testanything.org/producers.html): Ada, Arc (Lisp Dialect), C / C++, MyTAP (for MySQL), Common Lisp, Erlang, Limbo (OS Inferno), Forth, Go, Haskell, Java, Javascript, Lua, MATLAB, OCaml, Pascal, Perl, PostgreSQL, Prolog, Python, Ruby, PHP, PL/SQL, SH / Shell Script, DB2 SQL PL, Test and developer tools, Web services etc.

TAP Specification: http://testanything.org/tap-specification.html  
TAP Specification 13: http://testanything.org/tap-version-13-specification.html


## Writing tests

There's a very simple example at https://github.com/zixia/gast/blob/master/src/gas-tests.js , which is the test suite of GasT itself.

### `test(msg, cb)`: Create sub test

Create a new test with a description. cb(t) fires with the new test object t once all preceeding tests have finished. Tests execute serially.

```javascript
  test('I am a test', function (t) {
    t.ok(true, 'true is ok')
  })
```

### `t.ok(value, msg)`

Assert that `value` is truthy with an optional description message `msg`.

### `t.notOk(value, msg)`

Assert that `value` is falsy with an optional description message `msg`.

### `t.equal(actual, expected, msg)`

Assert that `actual == expected` with an optional description `msg`.

### `t.notEqual(actual, expected, msg)`

Assert that `actual != expected` with an optional description `msg`.

### `t.deepEqual(actual, expected, msg)`

Assert that actual and expected have the same structure and nested values with loose comparisons (==) on leaf nodes and an optional description msg.

### `t.notDeepEqual(actual, expected, msg)`

Assert that actual and expected do not have the same structure and nested values with loose comparisons (==) on leaf nodes and an optional description msg.

### `t.throws(fn, msg)`

Assert that the function call `fn()` throws an exception. 

### `t.notThrow(fn, msg)`

Assert that the function call `fn()` does not throw an exception.

### `t.pass(msg)`

Generate a passing assertion with a message `msg`.

### `t.fail(msg)`

Generate a failing assertion with a message `msg`.

### `t.skip`: Easily skip tests

Tests can be skipped by using the t.skip function at the point in a test you wish to skip.


```javascript
test('A test I do not want to execute for now', function (t) {  
  t.skip()
  var ret = foo()
  t.ok(ret)
})
```

Optionally, you may include a reason for skipping:

```javascript
test('A test I do not want to execute for now', function (t) {  
  t.skip('This function will return true soon, but not now')
  var ret = foo()
  t.ok(ret)
})
```

Or you can skip conditionally:

```javascript
test('A test which should run', function (t) {  
  if (foo != bar) {
    t.skip('foo is not bar')
  }

  var ret = foo()
  t.ok(ret)
})
```

## Running tests

To run your tests, open [google apps script editor](https://script.google.com), create a script file named Tests.gs, paste [tests of GasT](https://github.com/zixia/gast/blob/master/src/gas-tests.js) into it, then click Run in menu, select function ```gast``` . After click, you will see a message "Running function gast...". Wait till the message gone, then click View in menu, select Logs. You will see the output like the following snapshot.

If GasT is use the default printDriver Logger, it will print message in Google Apps Script Logger.log(). not run inside google apps script—in other words, if you run it from a continuous integration system, you can use other printDriver like ```ConsoleLog```(not support yet, at least v0.1.0), it will output machine-parsable TAP format.

GasT always use TAP format output(it's buggy now, more fix needed).

```tap
TAP version GasT v0.1.0(BUGGY)
ok 1 - true is ok - TAP ok
ok 2 - false is not ok - TAP ok
ok 3 - true equal true - TAP equal
ok 4 - true not equal false - TAP equal
ok 5 - exception throwed - TAP exception
ok 6 - no exception found - TAP exception
ok 7 - unknown driver throws exception - TAP setPrintDriver
ok 8 - skipped # SKIP - TAP skip
ok 9 - passed # PASS - TAP pass
not ok 10 - this should fail # FAIL - TAP fail
1..10
10 tests, 1 failures, 1 skipped
```

### Screen Snapshoot
![Test Anything Protocol(TAP) for Google Apps Script](https://raw.githubusercontent.com/zixia/gast/master/gast-script-editor-screenshot.png)

A online version of google spreadsheet bounded with GasT google apps scripts can be found here: 
* Spreadsheet - https://docs.google.com/spreadsheets/d/19M2DY3hunU6tDQFX5buJmZ_f3E8VFmlqAtodyC-J8Ag/edit#gid=323390886
* Script editor - https://script.google.com/a/zixia.net/macros/d/Mta4oea1VMIugfSGRo4QrAnKRT9d30hqB/edit?uiv=2&mid=ACjPJvGt4gnXjJwXnToB0jIMEbSvqKUF6vH-uq-m59SqnjXqTQ03NDn_khlNE6ha_mPnrOAYEnyFk80nHYmt_hppO3AgDkO_vVLrYJXzcPPagwRromd0znfLreNFAu4p0rYTC-Jlo-sAKOM

## Using GasT in Google Apps Script

Install GasT is very easy: just copy/paste the following javascript code to your Code.gs file, then you are ready to use GasT.

```javascript
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

var test = new GasTap()
```

To use GasT, we need a wraper function(to run inside Script Editor). The following code is a start template, you can add more test in the gast() function, then run gast() to see the test result.

```javascript
function gast() {
  test('calculation', function (t) {
  	var i = 3 + 4
    t.equal(i, 7, 'calc 3 + 4 = 7 right')
  })

  test('number convertion', function (t) {
    var i = parseInt('0e0', 16)
    t.equal(i, 224, 'parseInt')
  })

  test.finish()
}
```

Note that remember to keep `test.finish()` at the end of function, because it need to output the summary of all tests.

### How to print TAP result other than Logger.log

GasTap use Google Apps Script's standard log function Logger.log to default output.

If you want to output the result to a Spreadsheet or other places, it's very easy to use the `printer` option to inject a output function.

```javascript
var test = new GasTap({
  printer: function (msg) { Logger.log(msg) }
})
```

Above is the default setting of GasTap. You can change the printer function to whatever you want, as long as the function accept a parameter.

The following example set GasTap to output test tap result to a google spreadsheet, using a log library writen by me: [GasL](https://github.com/zixia/gasl) (GasL is a unix syslog like logging framework for Google Apps Script(GAS). It provides easy way for the GAS programs to log messages to Spreadsheet, LogEntries, RESTFUL API and Logger of GAS.)

```javascript
/**
*
* Load Libraries
*
*/
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

if ((typeof GasLog)==='undefined') { // GasL Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gasl/master/src/gas-log-lib.js').getContentText())
} // Class GasLog is ready for use now!

/**
*
* Create a log function that write to google spreadsheet
*
*/
var sheetPrinter = new GasLog.Printer.Spreadsheet({
  url: 'https://docs.google.com/spreadsheets/d/1_KRAtoDz2Pdcj9IPZI007I_gMzRyfmXf7gicgxVwYJc/edit#gid=0'
  , sheetName: 'GasTap'
})

var log = new GasLog({
  printer: sheetPrinter
  , ident: 'GasT'
})

/**
*
* use the log function above to output test TAP results to Google Spreadsheet:
* https://docs.google.com/spreadsheets/d/1_KRAtoDz2Pdcj9IPZI007I_gMzRyfmXf7gicgxVwYJc/edit#gid=0
*
*/
var test = new GasTap({
  logger: log
})
```

## Support

The GasT source code repository is hosted on GitHub. There you can file bugs on the issue tracker or submit tested pull requests for review. ( https://github.com/zixia/gast/issues )

For real-world examples from open-source projects using GasT, see Projects Using TasT on the wiki. ( https://github.com/zixia/gast/wiki )


## Version history

### [0.2.0](https://github.com/zixia/gast/tree/v0.2.0) (December 14, 2015)
* Support output to spreadsheet (LogEnteries, etc). powered by [GasLog](https://github.com/zixia/gasl) modle.

Use v0.2.0 in GAS

```javascript
/**
*
* GasT v0.2.0 Initialization. (only if not initialized yet.)
* https://github.com/zixia/gast
*
*/
if ((typeof GasTap)==='undefined') { 
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/v0.2.0/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!
```

### 0.1.0 (December 2, 2015)
* Initial public release.

-------------------------------------------
© 2015 Zhuohuan LI. GasT is released under an MIT-style license; see LICENSE for details.
