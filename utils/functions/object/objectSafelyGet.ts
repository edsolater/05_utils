import { isFunction } from '../judgers'

/**
 * @example
 * objectSafelyGet({ a: { b: 3 } }, 'a') //=> { b: 3 }
 * objectSafelyGet({ a: { b: 3 } }, ['a']) //=> { b: 3 }
 * objectSafelyGet({ a: { b: 3 } }, 'c') //=> undefined
 * objectSafelyGet({ a: { b: 3 } }, ['a', 'b']) //=> 3
 * objectSafelyGet({ a: { b: 3 } }, ['a', 'b', 'd']) //=> undefined
 *
 */
export default function objectSafelyGet(target: any, path: string | string[]): any {
  return [path].flat().reduce((accValue, currPropertyName) => {
    const result = accValue?.[currPropertyName]
    return isFunction(result) ? (...params) => result.apply(accValue, params)/* this 就是个地雷， 跟proxy一结合就炸了 */ : result
  }, target)
}

// TODO: let isFunction recognize proxied
