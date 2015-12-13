var GasTap = (function () {
  'use strict'

  var VERSION = '0.2.0'
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
  */

  var EXCEPTION_SKIP = 'GasTapSkip'
  var EXCEPTION_PASS = 'GasTapPass'
  var EXCEPTION_FAIL = 'GasTapFail'
  
  var GasTap = function (options) {
    
    var totalSucc = 0
    var totalFail = 0
    var totalSkip = 0
    
    var t = {    
      counter: 0
      , succCounter: 0
      , failCounter: 0
      , skipCounter: 0
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
      
      , reset: function () { 
        this.succCounter = this.failCounter = this.skipCounter = 0
        this.description = 'unknown'
      }

    }
    
    // default output to gas logger.log
    var printDriver = function (msg) { Logger.log(msg) }
    
    if (options && options.printer) {
      var printDriver = options.printer;
    }
    
    if (typeof printDriver != 'function') throw Error('options.printer must be a function to accept output parameter');
    
    print('TAP version GasTap v' + VERSION + '(BUGGY)')
  
    /***************************************************************
    *
    * Instance methods export 
    *
    ****************************************************************/
    test.finish = finish
  
    
    return test
  

    /***************************************************************
    *
    * Instance methods implementions
    *
    ****************************************************************/
    function test(description, run) {  
    
      t.reset()

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
        totalSucc += t.succCounter
        totalFail += t.failCounter
        totalSkip += t.skipCounter
        //      print('succCounter: %s, failCounter: %s, skipCounter: %s', t.succCounter, t.failCounter, t.skipCounter)
      }
    }
    
    function print() {
      var args = Array.prototype.slice.call(arguments)
      
      var message = Utilities.formatString.apply(null, args)
      printDriver(message)
    }
    
    
    function tapOutput(ok, msg) {
      print(
        (ok ? 'ok' : 'not ok')
        + ' ' + ++t.counter
        + ' - ' + msg
        + ' - ' + t.description
      )
    }

    
    function finish () { 
      var totalNum = totalSucc + totalFail + totalSkip
      
      //    print("%s, %s, %s, %s", totalSucc, totalFail, totalSkip, t.counter)
      
      if (totalNum != (t.counter)) {
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

    /***************************************************************
    *
    * T 's functions
    *
    ****************************************************************/
    
    function ok(value, msg) {
      if (value) {
        this.succCounter++;
        tapOutput(true, msg)
      } else {
        this.failCounter++;
        tapOutput(false, msg)
      }
    }
    
    function notOk(value, msg) {
      if (!value) {
        this.succCounter++;
        tapOutput(true, msg)
      } else {
        this.failCounter++;
        tapOutput(false, msg)
      }
    }
    
    function equal(v1, v2, msg) {
      if (v1 === v2) {
        this.succCounter++;
        tapOutput(true, msg)
      } else {
        this.failCounter++;
        var error = Utilities.formatString('%s not equal %s', v1, v2)
        tapOutput(false, error + ' - ' + msg)
      }
    }
    
    function notEqual(v1, v2, msg) {
      if (v1 != v2) {
        this.succCounter++;
        tapOutput(true, msg)
      } else {
        this.failCounter++;
        var error = Utilities.formatString('%s equal %s', v1, v2)
        tapOutput(false, error + ' - ' + msg)
      }
    }
    
    function throws(fn, msg) {
      try {
        fn()
        
        this.failCounter++;
        tapOutput(false, 'exception wanted - ' + msg)
      } catch (e) {
        this.succCounter++;
        tapOutput(true, msg)
      }
    }
    
    function notThrow(fn, msg) {
      try {
        fn()
        
        this.succCounter++;
        tapOutput(true, msg)
      } catch (e) {
        this.failCounter++;
        tapOutput(false, 'unexpected exception:' + e.message + ' - ' + msg)
      }
    }
    
    function skip(msg) {
      this.skipCounter++;
      tapOutput(true, msg + ' # SKIP')
      throw EXCEPTION_SKIP
    }
    
    function pass(msg) {
      this.succCounter++;
      tapOutput(true, msg + ' # PASS')
      throw EXCEPTION_PASS
    }
    
    function fail(msg) {
      this.failCounter++;
      tapOutput(false, msg + ' # FAIL')
      throw EXCEPTION_FAIL
    }
  }

  
  return GasTap
  
  
}())
