/**
*
* Put tests in me, then run me!
*
*/
function gastTestRunner() {
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
  *
  */
  
  
  //////////////////////////////////////////////////////////////////////////////////////////
  ///// GasT include header start
  
  if ((typeof GasTap)==='undefined') { // GasT Initialization. (only if not initialized yet.)
    eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
  } // Class GasTap is ready for use now!
  
  ///// GasT include header end
  //////////////////////////////////////////////////////////////////////////////////////////
  
  
  var test = new GasTap()
  

  test('TAP ok', function (t) {
    t.ok(true, 'true is ok')
    t.notOk(false, 'false is not ok')
  })
  
  test('TAP equal', function (t) {    
    t.equal(true, true, 'true equal true')
    t.notEqual(true, false, 'true not equal false')
    
    t.equal(99, String(99), 'number 99 equal string "99"')
    
    var a = { x: 3, y: { a: 4, b: 5}, z: [5, 6] }
    var a2 = { x: 3, y: { a: 4, b: 5}, z: [5, 6] }
    var b = { a: [3, 4], b: 3, c: {a: 3} }
    
    t.deepEqual(a, a2, 'a deepEqual a2')
    t.notDeepEqual(a, b, 'a notDeepEqual b')
    
    t.deepEqual([0], [0], '[0] deepEqual [0]')
    t.notDeepEqual([0], [0], 'this should fail: [0] notDeepEqual [0]')

    t.isNaN(NaN, 'NaN is NaN')
    t.notIsNaN({}, '{} not is NaN')

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
