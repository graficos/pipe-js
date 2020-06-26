/**
 * Same as `pipe` but wraps execution in Promises and returns a promise.
 * Provided functions can be async
 * @func
 * @param {(() => unknown)[]} functions
 */
export const asyncPipe = (...functions) => /** @func
 * @param {unknown} value
 * @returns {Promise<unknown>}
 */ (value) =>
  functions.reduce(
    /**
     * @param {Promise} currentPromise
     * @param {() => unknown} currentFunction
     */
    (currentPromise, currentFunction) => {
      return currentPromise.then(currentFunction)
    },
    Promise.resolve(value)
  )
