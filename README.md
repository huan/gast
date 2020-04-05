# GasT - Google Apps Script Testing-framework

GasT is a [TAP](http://testanything.org/)-compatable testing framework for Google Apps Script (GAS). It provides an easy way to verify whether GAS programs you write is behaving as expected or not.

Github: https://github.com/huan/gast

A GasT unit test file is a javascript which defines GAS unit testing cases. Behind the scenes, each GAS test case is simply a function that takes a description parameter, and outputs in TAP format.

```javascript
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/huan/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

var test = new GasTap()

function gastTestRunner() {
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

GasT is most useful when testing javascript in Google Apps Script environment. if you are running outside of GAS environment, there are other TAP testing frameworks available, such as [TAPE - a tap-producing test harness for node and browsers](https://github.com/substack/tape).

Test cases consist of Google Apps Scripts. 

## About TAP

TAP is Test Anything Protocol, as understood by Perl 1.0's t/TEST on year 1988.
```
commit 840163baa12f7970131f7841c479bccf5be40ba9
Author: Larry Wall <lwall@jpl-devvax.jpl.nasa.gov>
Date:   Sat Jan 30 23:00:00 1988 +0000
```

Version 2 implemented in year 1996.
```
commit 4bce96efdcaa480e392138e10166c92c5fc5f22c
Author: Perl 5 Porters <perl5-porters@africa.nicoh.com>
Date:   Fri Feb 2 18:52:27 1996 -0800
```

More TAP History: http://testanything.org/history.html

Today, TAP is widely supported as a unit testing framework by test harness and automated test framework, in almost all languages. [TAP has Producers in](http://testanything.org/producers.html): Ada, Arc (Lisp Dialect), C / C++, MyTAP (for MySQL), Common Lisp, Erlang, Limbo (OS Inferno), Forth, Go, Haskell, Java, Javascript, Lua, MATLAB, OCaml, Pascal, Perl, PostgreSQL, Prolog, Python, Ruby, PHP, PL/SQL, SH / Shell Script, DB2 SQL PL, Test and developer tools, Web services etc.

TAP Specification: http://testanything.org/tap-specification.html  
TAP Specification 13: http://testanything.org/tap-version-13-specification.html


## Writing tests

There's a very simple example at https://github.com/huan/gast/blob/master/src/gas-tests.js, which is the test suite of GasT itself.

### `test(msg, cb)`: Create sub test

Create a new test with a description. cb(t) fires with the new test object t once all preceeding tests have finished.

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

Assert that `actual` and `expected` have the same structure and nested values with loose comparisons (==) on leaf nodes and an optional description message

### `t.notDeepEqual(actual, expected, msg)`

Assert that `actual` and `expected` do not have the same structure and nested values with loose comparisons (==) on leaf nodes and an optional description msg.

### `t.throws(fn, msg)`

Assert that function call `fn()` throws an exception. 

### `t.notThrow(fn, msg)`

Assert that function call `fn()` does not throw an exception.

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

### `t.end`: Prints a total line to log output. For an example "3 tests, 0 failures"

Total counts of the tests can be printed a total line after a test or after all.

__Aliases__: final

```
Logs

[17-04-13 17:04:15:788 MSK] TAP version GasTap v0.2.0(BUGGY)
[17-04-13 17:04:16:381 MSK] ok 1 - ALL FINE! - getBase()
[17-04-13 17:04:16:557 MSK] ok 2 -  - getActiveData()
[17-04-13 17:04:16:562 MSK] 1..2
[17-04-13 17:04:16:568 MSK] 2 tests, 0 failures           <= the end() result
[17-04-13 17:04:19:820 MSK] ok 3 -  - getDestination
[17-04-13 17:04:19:826 MSK] 1..3
[17-04-13 17:04:19:831 MSK] 3 tests, 0 failures           <= the end() result
```

### `t.totalFailed`, `t.totalSucceed`, `t.totalSkipped`: Checking test results

Totals of failed, succeed and skipped test can be checked programaticaly.
You will find this usefull if you wish to throw an exception in case of test failures.

```javascript
test.finish()
if (test.totalFailed()>0) {
  throw "Some test(s) failed!"
}
```


## Running tests

To run your tests, open [google apps script editor](https://script.google.com), create a script file named Tests.gs, paste [tests of GasT](https://github.com/huan/gast/blob/master/src/gas-tests.js) into it, then click Run in menu, select function `gastTestRunner` . After click, you will get a message "Running function gast...". Wait until the message disapears, then click View in menu, select Logs. You will see the output like the following snapshot.

If GasT uses the default printDriver Logger, it will print message in Google Apps Script Logger.log(). If GasT is not run inside google apps script, in other words, if you run it from a continuous integration system, you can use other printDriver like ```ConsoleLog```(currenlty not supported), it will output in machine-parsable TAP format.

GasT always uses TAP format output(it's buggy now, more fix needed).

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

![Test Anything Protocol(TAP) for Google Apps Script](https://raw.githubusercontent.com/huan/gast/master/gast-script-editor-screenshot.png)

An online version of google spreadsheet bounded with GasT google apps scripts can be found here: 
* Spreadsheet - https://docs.google.com/spreadsheets/d/19M2DY3hunU6tDQFX5buJmZ_f3E8VFmlqAtodyC-J8Ag/edit#gid=323390886
* Script editor - https://script.google.com/a/zixia.net/macros/d/Mta4oea1VMIugfSGRo4QrAnKRT9d30hqB/edit?uiv=2&mid=ACjPJvGt4gnXjJwXnToB0jIMEbSvqKUF6vH-uq-m59SqnjXqTQ03NDn_khlNE6ha_mPnrOAYEnyFk80nHYmt_hppO3AgDkO_vVLrYJXzcPPagwRromd0znfLreNFAu4p0rYTC-Jlo-sAKOM

## Using GasT in Google Apps Script

There's two ways to load GasT library into your code:

1. Use eval below(Recommended because it's the easist way to use GasT)  
Zero setup, paste and run.
1. GasT project key: `ME7pXzfKF5_60_TNOSJ2ylCqMEWMB0UzS`  
Input it into script editor -> Resources -> Libraries... -> Find a Library, then click Select.

Install GasT is very easy: simply copy/paste the following javascript code to your Code.gs file, then you are ready to use GasT.

```javascript
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/huan/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

var test = new GasTap()
```

Also you can decide to use the best practices from [developers.google.com](https://developers.google.com/apps-script/best_practices#use-the-cache-service). By caching data, you can reduce the number of times or frequency with which you have to fetch the data.

```javascript
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  var cs = CacheService.getScriptCache().get('gast');
  if(!cs){
    cs = UrlFetchApp.fetch('https://raw.githubusercontent.com/huan/gast/master/src/gas-tap-lib.js').getContentText();
    CacheService.getScriptCache().put('gast', cs, 21600);
  }
  eval(cs);
} // Class GasTap is ready for use now!

var test = new GasTap()
```

To use GasT, we need a wraper function(to run inside Script Editor). The following code is a simple template, you can add more test cases in the gastTestRunner() function, then run gastTestRunner() to see the test results.

```javascript
function gastTestRunner() {
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

Remember to keep `test.finish()` at the end of function, because it needs to output the summary of all test results.

### How to print TAP results other than using `Logger.log`

GasTap uses Google Apps Script's standard log function Logger.log as default output.

If you want to output results to a Spreadsheet or other destinations, it's very easy to use the `printer` option to inject an output function.

```javascript
var test = new GasTap({
  printer: function (msg) { Logger.log(msg) }
})
```

Above is the default setting of GasTap. You can modify the printer function based on your requirement, as long as the function accepts the same parameter.

The following example sets GasTap to output test tap results to a google spreadsheet using a log library writen by me: [GasL](https://github.com/huan/gasl) (GasL is a unix syslog like logging framework for Google Apps Script(GAS). It provides easy way for the GAS programs to log messages to Spreadsheet, LogEntries, RESTFUL API and Logger of GAS.)

```javascript
/**
*
* Load Libraries
*
*/
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/huan/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

/**
*
* Create a log function that writes to google spreadsheet
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

The GasT source code repository is hosted on GitHub. There you can file bugs on the issue tracker or submit tested pull requests for review. ( https://github.com/huan/gast/issues )

For real-world examples from open-source projects using GasT, see Projects Using TasT on the wiki. ( https://github.com/huan/gast/wiki )


## Version history

### [v0.3.0](https://github.com/huan/gast/tree/v0.3.0) (Feb 26, 2016)

* Published with project key `ME7pXzfKF5_60_TNOSJ2ylCqMEWMB0UzS`(thanks @[brucemcpherson](https://github.com/brucemcpherson) for suggestion)

### [v0.2.0](https://github.com/huan/gast/tree/v0.2.0) (December 14, 2015)
* Support output to spreadsheet (LogEnteries, etc). powered by [GasLog](https://github.com/huan/gasl) modle.

Use v0.2.0 in GAS

```javascript
/**
*
* GasT v0.2.0 Initialization. (only if not initialized yet.)
* https://github.com/huan/gast
*
*/
if ((typeof GasTap)==='undefined') { 
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/huan/gast/v0.2.0/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!
```

### v0.1.0 (December 2, 2015)
* Initial public release.

## Links

- [How to perform Google Add-on automated unit testing](https://medium.com/effilab/how-to-perform-google-add-on-automated-unit-testing-and-publishing-with-circle-ci-part-2-636c7589350e) Thanks [@rubenflamshepherd](https://github.com/rubenflamshepherd) for letting me know this great article from [#23](https://github.com/huan/gast/pull/23#issuecomment-608947524)

## Author

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)) zixia@zixia.net

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

* Code & Docs © 2015-now Huan LI \<zixia@zixia.net\>
* Code released under the MIT License
* Docs released under Creative Commons
