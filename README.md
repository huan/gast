# GasT - Google Apps Script Testing-framework

GasT is a TAP-compliant testing framework for Google Apps Script. It provides a simple way to verify that the GAS programs you write behave as expected.

A GasT test file is a Javascript which defining test cases. Under the hood, each test case is just a function with a description.

Github - https://github.com/zixia/gast


```javascript
var gastLibUrl='https://raw.githubusercontent.com/zixia/gast/master/gas-tap.js'
eval(UrlFetchApp.fetch(gastLibUrl).getContentText())

var test = GasTap.setPrintDriver('Logger') 

function gast() {
  test('do calculation right', function (t) {    
  	var i = 3 + 4
    t.equal(i, 7, 'I can calc 3 + 4 = 7')
  })

  test('Spreadsheet exist', function (t) {
	var ss = SpreadsheetApp.openById('1TBJpvlW3WWney4rk1yW5N9bAP8dOMkWxI97dOtco-fc')
    t.ok(ss, 'I can open spreadsheet')
  })

  test.finish()
}
```

GasT is most useful when testing javascript running on Google Apps Script environment. if you are running out of GAS, there's other TAP testing framework as well, such as [TAPE - a tap-producing test harness for node and browsers](https://github.com/substack/tape).

Test cases consist of Google Apps Scripts. 


## Writing tests

TBW.

 There's a very simple example at https://github.com/zixia/gast/blob/master/gas-tests.js , which is the test suite of GasT itself.


## Running tests

Open [google apps script editor](https://script.google.com), create a script file named Tests.gs, paste [tests of GasT](https://github.com/zixia/gast/blob/master/gas-tests.js) into it, then click Run in menu, select function ```gast``` . After click, you will see a message "Running function gast...". Wait till the message gone, then click View in menu, select Logs. You will see the output like the following snapshot.


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

To use GasT, we need a wraper test function(to run inside Script Editor). The following code is a start template, you can add more test inside the function gast().

```javascript
function gast() {
  test('do calculation right', function (t) {    
  	var i = 3 + 4
    t.equal(i, 7, 'I can calc 3 + 4 = 7')
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