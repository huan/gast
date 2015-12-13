'use strict'
/**
*
* GasT - Google Apps Script Testing-framework
* 
* GasT is a TAP-compliant testing framework for Google Apps Script. 
* It provides a simple way to verify that the GAS programs you write 
* behave as expected.
*
* Github - https://github.com/zixia/gast
* Test Anything Protocol - http://testanything.org/
* 
* Issues: https://github.com/zixia/gast/issues
* Author: Zhuohuan LI <zixia@zixia.net>
* Date: 2015-11-05
*
* Example:
```
if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

var test = new GasTap()
*
*/


/**
*
* Put tests in me, then run me!
*
*/
function gast() {
  
  
  //////////////////////////////////////////////////////////////////////////////////////////
  ///// GasT include header start
  
  if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
  } // Class GasTap is ready for use now!
  
  ///// GasT include header end
  //////////////////////////////////////////////////////////////////////////////////////////
  
  if ((typeof GasLog)==='undefined') { // GasL Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gasl/master/src/gas-log-lib.js').getContentText())
  } // Class GasLog is ready for use now!

  var sheetPrinter = new GasLog.Printer.Spreadsheet({
    url: 'https://docs.google.com/spreadsheets/d/1_KRAtoDz2Pdcj9IPZI007I_gMzRyfmXf7gicgxVwYJc/edit#gid=0'
    , sheetName: 'GasTap'
  })

  var log = new GasLog({
    printer: sheetPrinter
    , ident: 'GasT'
  })

  var test = new GasTap({
    logger: log
  })


//  var test = new GasTap({
//    printer: function (msg) { Logger.log(msg) }
//  })
  

  test('TAP ok', function (t) {
    t.ok(true, 'true is ok')
    t.notOk(false, 'false is not ok')
  })
  
  test('TAP equal', function (t) {    
    t.equal(true, true, 'true equal true')
    t.notEqual(true, false, 'true not equal false')
  })
  
  test('TAP exception', function (t) {
    t.throws(function () { throw Error('exception') }, 'exception throwed')
    t.notThrow(function () { return }, 'no exception found')
  })
  
  test('TAP setPrintDriver', function (t) {
    t.throws(function () { test.setPrintDriver('unknown') }, 'unknown driver throws exception')
  })

  test('TAP skip', function (t) {  
    t.skip('skipped')
    t.fail('skip failed')
  })
       
  test('TAP pass', function (t) {
    t.pass('passed')
  })
  
  test('TAP fail', function (t) {
    t.fail('this should fail')
  })

  test.finish()

}
