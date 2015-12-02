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

var GasTap = (function () {

  var EXCEPTION_SKIP = 'GasTapSkip'
  var EXCEPTION_PASS = 'GasTapPass'
  var EXCEPTION_FAIL = 'GasTapFail'
  
  var totalSucc = 0
  var totalFail = 0
  var totalSkip = 0
  
  var t = {    
    nIndex: 0
    , nSucc: 0
    , nFail: 0
    , nSkip: 0
    , description: 'unknown description'
    
    , ok: ok
    , notOk: notOk
    
    , equal: equal
    , notEqual: notEqual
    
    , throws: throws
    , notThrow: notThrow
    
    , skip: skip
    , pass: pass
    , fail: fail
  }
  
  var printDriver = function () { throw Error('undefined print driver!') }
  setPrintDriver('Logger')
  
  var test_ = function (description, run) {  
    
    t.nSucc = t.nFail = t.nSkip = 0
    t.description = description
    
    try {
      
      run(t)
      
    } catch ( e ) {
//      Logger.log('caught exception: ' + e)
      
      SKIP_RE = new RegExp(EXCEPTION_SKIP)
      PASS_RE = new RegExp(EXCEPTION_PASS)
      FAIL_RE = new RegExp(EXCEPTION_FAIL)
      
      switch (true) {
        case SKIP_RE.test(e):
        case PASS_RE.test(e):
        case FAIL_RE.test(e):
          break;
        default:
          throw e
      }      
    } finally { 
      totalSucc += t.nSucc
      totalFail += t.nFail
      totalSkip += t.nSkip
//      print('nSucc: %s, nFail: %s, nSkip: %s', t.nSucc, t.nFail, t.nSkip)
    }
  }
  

  
  /***************************************************************
  *
  * Static methods of GasTap Class
  *
  ****************************************************************/
  test_.setPrintDriver = setPrintDriver
  test_.finish = finish
  
  print('TAP version GasT v0.1.1(BUGGY)')
  
  return test_
  

  /***************************************************************
  *
  * function implementions
  *
  ****************************************************************/

  function print() {
    var args = Array.prototype.slice.call(arguments)
    
    var message = Utilities.formatString.apply(null, args)
    
    printDriver(message)
  }
  
  function tapOutput(ok, msg) {
    print(
      (ok ? 'ok' : 'not ok')
      + ' ' + ++t.nIndex
      + ' - ' + msg
      + ' - ' + t.description
    )
  }
  
  function setPrintDriver(driverName) {
    switch (true) {
      case /Logger/i.test(driverName):
        printDriver = function (msg) { return Logger.log(msg) }
        break;
      default:
        throw Error('unsupported driverName: ' + driverName)
    }
    
    return test_
  }
  
  function ok(value, msg) {
    if (value) {
      this.nSucc++;
      tapOutput(true, msg)
    } else {
      this.nFail++;
      tapOutput(false, msg)
    }
  }

  function notOk(value, msg) {
    if (!value) {
      this.nSucc++;
      tapOutput(true, msg)
    } else {
      this.nFail++;
      tapOutput(false, msg)
    }
  }

  function equal(v1, v2, msg) {
    if (v1 === v2) {
      this.nSucc++;
      tapOutput(true, msg)
    } else {
      this.nFail++;
      var error = Utilities.formatString('%s not equal %s', v1, v2)
      tapOutput(false, error + ' - ' + msg)
    }
  }

  function notEqual(v1, v2, msg) {
    if (v1 != v2) {
      this.nSucc++;
      tapOutput(true, msg)
    } else {
      this.nFail++;
      var error = Utilities.formatString('%s equal %s', v1, v2)
      tapOutput(false, error + ' - ' + msg)
    }
  }
  
  function throws(fn, msg) {
    try {
      fn()
      
      this.nFail++;
      tapOutput(false, 'exception wanted - ' + msg)
    } catch (e) {
      this.nSucc++;
      tapOutput(true, msg)
    }
  }
  
  function notThrow(fn, msg) {
    try {
      fn()
      
      this.nSucc++;
      tapOutput(true, msg)
    } catch (e) {
      this.nFail++;
      tapOutput(false, 'unexpected exception:' + e.message + ' - ' + msg)
    }
  }
  
  function skip(msg) {
    this.nSkip++;
    tapOutput(true, msg + ' # SKIP')
    throw EXCEPTION_SKIP
  }
  
  function pass(msg) {
    this.nSucc++;
    tapOutput(true, msg + ' # PASS')
    throw EXCEPTION_PASS
  }

  function fail(msg) {
    this.nFail++;
    tapOutput(false, msg + ' # FAIL')
    throw EXCEPTION_FAIL
  }

  function finish () { 
    var totalNum = totalSucc + totalFail + totalSkip
    
//    print("%s, %s, %s, %s", totalSucc, totalFail, totalSkip, t.nIndex)

    if (totalNum != (t.nIndex)) {
      throw Error('test counting error!')
    }
    
    var msg = Utilities.formatString('1..%s', Math.floor(totalNum))
    print(msg)
    
    msg = Utilities.formatString('%s tests, %s failures', Math.floor(totalNum), Math.floor(totalFail))
    
    if (totalSkip>0) {
      msg += ', ' + Math.floor(totalSkip) + ' skipped'
    }
    
    print(msg) 
  }

}())
