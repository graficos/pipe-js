/**
 * Executes a series of functions ("transformations") over the same type of stream.
 * Each function expects to recieve the same type the previous is returning
 * @func
 * @param {Function[]} functions
 */
export const pipe = (...functions) =>
  /**
   * @param {unknown} value
   */
  (value) =>
    functions.reduce(
      (currentValue, currentFunction) => currentFunction(currentValue),
      value
    )
