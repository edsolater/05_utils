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
  return [path].flat().reduce((accValue, currPropertyName) => accValue?.[currPropertyName], target);
}
