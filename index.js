/**
 * A simple if/elif/else chain that can be used as chainable functions.
 * Since React doesn't support if/else statements, this can be used instead.
 * 
 * Technically, this is a ternary operator, but it's more readable and also supports `else if`.
 * 
 * - Chains should end with `else(...)` or `end()`
 * - `else().then(...)` can also be used instead of `else(...)`
 * 
 * @example
 * _if(false)
 * .then('Hi')
 * .elif(true)
 * .then('Hello')
 * .else('Bye')
 * // This will return 'Hello'
 * 
 * @example
 * _if(false)
 * .then('Hi')
 * .elif(false)
 * .then('Hello')
 * .else()
 * .then('Bye')
 * // This will return 'Bye'
 * 
 * @example
 * _if(false)
 * .then(() => { ... })
 * .else(() => { ... })
 * // This will call the function in `else()`
 */
class IfElif {
  constructor(condition) {
    this.condition = condition;
  }

  /**
   * Start a new IfElif chain.
   * 
   * You can also use `_if(...)` instead of `IfElif.if(...)`
   * @param {boolean} condition
   * @returns {IfElif}
   */
  if(condition) {
    return new IfElif(condition);
  }

  /**
   * If the condition is `true`, then return the result. Otherwise, return itself to continue the chain.
   * @param {any} yes
   * @returns {IfElifResult|IfElif}
   * @example
   * _if(true)
   * .then('Hi')
   * .else('Bye')
   * // This will return 'Hi'
   */
  then(yes) {
    return this.condition ? new IfElifResult(yes) : this;
  }

  /**
   * Create a new IfElif instance. 
   * @param {boolean} condition
   * @returns {IfElif}
   * @example
   * _if(false)
   * .then('Hi')
   * .elif(true)
   * .then('Hello')
   * .else('Bye')
   * // This will return 'Hello'
   */
  elif(condition) {
    return new IfElif(condition);
  }

  /**
   * Alias for `elif(...)`
   * @param {boolean} condition
   * @returns {IfElif}
   * @example
   * _if(false)
   * .then('Hi')
   * .elseIf(true)
   * .then('Hello')
   * .else('Bye')
   */
  elseIf(condition) {
    return new IfElif(condition);
  }

  /**
   * Check the condition is `false`, then return the result. Otherwise, return itself to continue the chain.
   * 
   * Check result is not provided, then it will return a new IfElif instance with the opposite condition.
   * @param {any} no The result to return if the condition is `false`
   * @returns {ElseResult|IfElif|any}
   * @example
   * _if(false)
   * .then('Hi')
   * .else('Bye')
   * // This will return 'Bye'
   * @example
   * _if(false)
   * .then('Hi')
   * .else()
   * .then('Bye')
   * // This will also return 'Bye'
   */
  else(no) {
    if (no !== undefined) { return this.condition ? this : (no instanceof Function ? no() : no); }
    return new ElseResult();
  }

  /**
   * Return null since the chain is not resolved.
   * 
   * If you don't have `else()` at the end of the chain, you have to call `end()` to end the chain.
   * @returns {null}
   * @example
   * _if(false)
   * .then('Hi')
   * .end()
   * // This will return null
   */
  end() {
    return null;
  }
}

/**
 * The result of a IfElif chain.
 * 
 * This is used to continue the chain or return the result.
 */
class IfElifResult {
  constructor(result) {
    if (result instanceof Function) {
      this.result = result();
    } else {
      this.result = result;
    }
  }

  /**
   * Since the condition was met, just pass the result to next function.
   * @returns {IfElifResult}
   */
  then() {
    return this;
  }

  /**
   * Since the condition was met, just pass the result to next function.
   * @returns {IfElifResult}
   */
  elif() {
    return this;
  }

  /**
   * Alias for `elif(...)`
   * @returns {IfElifResult}
   */
  elseIf() {
    return this;
  }

  /**
   * Since the condition was met, just return the result if `else(...)` is called.
   * 
   * If you prefer `else().then(...)`, then it will pass the result to `then(...)` to end the chain.
   * @returns {ElseResult|any}
   */
  else(no) {
    if (no !== undefined) { return this.result; }
    return new ElseResult(this.result);
  }

  /**
   * Ends the chain and returns the result.
   * 
   * If you have `else(...)` or `else().then(...) at the end of the chain, you don't have to call `end()`.
   * @returns {any} 
   */
  end() {
    return this.result;
  }
}

/**
 * This is a helper class for `else()`
 * 
 * It saves you from having to call `end()` at the end of the chain, if you have `else(...)` or `else().then(...)`
 */
class ElseResult {
  constructor(result) {
    if (result instanceof Function) {
      this.result = result();
    } else {
      this.result = result;
    }
  }

  /**
   * Since the condition was met, just pass the result
   * @returns {any} The result of the condition that was met
   * @example
   * _if(false)
   * .then('Hi')
   * .else()
   * .then('Bye')
   * // This will return 'Bye'
   */
  then(result) {
    return this.result || result;
  }

  /**
   * Since the condition was met, just pass the result.
   * 
   * Not needed after `else()`, but you can use it if you want.
   * @returns {any} The result of the condition that was met
   */
  end() {
    return this.result;
  }
}

/**
 * Start a new IfElif chain that be combined with `then(...)`, `elif(...)`, `else(...)`, and `end()`.
 * 
 * Can be used like:
 * - if(bool).then(...).elif(bool).then().else(...)
 * - if(bool).then(...).elif(bool).then().else().then(...)
 * - if(bool).then(...).end()
 * - if(bool).then(...).elif(bool).then(...).end()
 * 
 * @param {boolean} condition
 * @returns {IfElif}
 * @example
 * _if(false)
 * .then('Hi')
 * .elif(true)
 * .then('Hello')
 * .else('Bye')
 * // This will return 'Hello'
 * @example
 * _if(false)
 * .then('Hi')
 * .elif(false)
 * .then('Hello')
 * .else()
 * .then('Bye')
 * // This will return 'Bye'
 */
function _if(condition) {
  return new IfElif(condition);
}

module.exports = {
  default: _if,
  _if,
  IfElif
};