import isObjectLike from '../judgers/isObjectOrArray'
import merge from '../object/merge'
import formatNumber from '../math/formatNumber'
import { AnyFn } from '../../../typings/constants'

/**
 * attach a param to the function.return the function's copy.
 * predefined param and runtime param will merge eventually
 *
 * @returns new function
 * @example
 * onst newFormat = partlyInvoke(format, 1, { alwaysSign: true })
 * console.log(newFormat(123456)) // same as : format(123456, { alwaysSign: true})
 */
export function partlyInvoke<F extends AnyFn, Index extends number>(
  pureFunc: F,
  paramIndex: Index,
  param: Partial<Parameters<F>[Index]>
): F {
  const partlyInvokedFunction = (...args: Parameters<F>) => {
    const oldParam = args[paramIndex]
    const newParam = isObjectLike(oldParam) && isObjectLike(param) ? merge(oldParam, param) : param
    return pureFunc(...args.slice(0, paramIndex), newParam, ...args.slice(paramIndex + 1))
  }
  //@ts-ignore
  return partlyInvokedFunction
}
const newFormat = partlyInvoke(formatNumber, 1, { alwaysSign: true })
console.log(newFormat(123456))
