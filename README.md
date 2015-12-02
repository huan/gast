# GasT - Google Apps Script Testing-framework

GasT is a [TAP](http://testanything.org/)-compliant testing framework for Google Apps Script. It provides a simple way to verify that the GAS programs you write behave as expected.

Github - https://github.com/zixia/gast

A GasT unit testing file is a Javascript which defining unit testing cases. Under the hood, each test case is just a function with a description, and output as TAP format.

```javascript
var gastLibUrl='https://raw.githubusercontent.com/zixia/gast/master/gas-tap.js'
eval(UrlFetchApp.fetch(gastLibUrl).getContentText())

var test = GasTap.setPrintDriver('Logger') 

function gast() {
  test('do calculation right', function (t) {    
  	var i = 3 + 4
    t.equal(i, 7, 'calc 3 + 4 = 7 right')
  })

  test('Spreadsheet exist', function (t) {
	var ss = SpreadsheetApp.openById('1TBJpvlW3WWney4rk1yW5N9bAP8dOMkWxI97dOtco-fc')
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

TBW.

 There's a very simple example at https://github.com/zixia/gast/blob/master/gas-tests.js , which is the test suite of GasT itself.


## Running tests

To run your tests, open [google apps script editor](https://script.google.com), create a script file named Tests.gs, paste [tests of GasT](https://github.com/zixia/gast/blob/master/gas-tests.js) into it, then click Run in menu, select function ```gast``` . After click, you will see a message "Running function gast...". Wait till the message gone, then click View in menu, select Logs. You will see the output like the following snapshot.

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
![Test Anything Protocol(TAP) for Google Apps Script](https://raw.githubusercontent.com/zixia/gast/master/gas-tap.png)

A online version of google spreadsheet bounded with GasT google apps scripts can be found here: https://docs.google.com/spreadsheets/d/19M2DY3hunU6tDQFX5buJmZ_f3E8VFmlqAtodyC-J8Ag

## Using GasT in Google Apps Script

Install GasT is very easy: just copy/paste the following javascript code to your Code.gs file, then you are ready to use GasT.

```javascript
var gastLibUrl = 'https://raw.githubusercontent.com/zixia/gast/master/gas-tap.js'
eval(UrlFetchApp.fetch(gastLibUrl).getContentText())
var test = GasTap.setPrintDriver('Logger') 
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


## Support

The GasT source code repository is hosted on GitHub. There you can file bugs on the issue tracker or submit tested pull requests for review. ( https://github.com/zixia/tap-google-apps-script/issues )

For real-world examples from open-source projects using GasT, see Projects Using TasT on the wiki. ( https://github.com/zixia/tap-google-apps-script/wiki )


## Version history

### 0.1.0 (December 2, 2015)
* Initial public release.

-------------------------------------------
© 2015 Zhuohuan LI. GasT is released under an MIT-style license; see LICENSE for details.