import { AnyFn } from '../../../typings/constants'
import isFunction from '../judgers/isFunction'

/**
 * get value from input, if input is a function. it will ve invoked
 *
 * @param mayValue maybe a function that will return targetValue
 * @param params the parameters that will be passed in mayValue(if it's function)
 * @returns a pure value which can't be a function
 */
export function shrinkToValue<T>(
  mayValue: T,
  params?: T extends AnyFn ? Parameters<T> : any[]
): Exclude<T, AnyFn> {
  // @ts-ignore
  return isFunction(mayValue) ? mayValue(...(params ?? [])) : mayValue
}
