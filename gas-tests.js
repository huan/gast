'use strict'
/**
*
* Test Anything Protocol(TAP) for Google Apps Script
*
* https://github.com/zixia/gast
*
* Test Anything Protocol - http://testanything.org/
* Issues: https://github.com/zixia/gast/issues
* Author: Zhuohuan LI <zixia@zixia.net>
* Date: 2015-11-05
*
*/

var gasLib='https://raw.githubusercontent.com/zixia/gast/master/gas-tap.js'
eval(UrlFetchApp.fetch(gasLib).getContentText())

var test = GasTap.setPrintDriver('Logger') 

/**
*
* Put tests in me, then run me!
*
*/
function gast() {
  
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
