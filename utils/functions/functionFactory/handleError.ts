/**
 * @todo test it !!!
 * it's a function, that handle error use try/catch
 *
 * if you will pass some parameter to the function, please wrap it in an empty arrow function
 * @example
 * const saveFunction = handleError(dosomething, (e)=>{console.log(e)})
 * const asyncSaveFunction = handleError(asyncDosomething, (e)=>{console.log(e)})
 */
export default function handleError<
  F extends (...params: any[]) => any,
  Handler extends (error: Error) => void
>(
  fn: F,
  handler: Handler
): F & {
  originalFunction: F
  errorHandler: Handler
} {
  function safeFunction(...params: Parameters<F>) {
    try {
      const result = fn(...params)
      if (result instanceof Promise) {
        result.catch((e) => handler(e))
      }
      return result
    } catch (err) {
      handler(err)
    }
  }
  safeFunction.originalFunction = fn
  safeFunction.errorHandler = handler
  //@ts-ignore
  return safeFunction
}
