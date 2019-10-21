var _class_ = undefined;

/**
 * Loads GasTap
 * 
 * @return {void}
 */
function load() {
  /** gas-tap-lib.js **/
  _class_ = GasTap;
}

/**
 * Returns a new GasTap instance
 * 
 * @return {object}
 */
function getInstance() {
  if (!_class_) load();
  return new _class_();
}
