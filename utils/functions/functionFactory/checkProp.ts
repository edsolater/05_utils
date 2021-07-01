import isObjectLike from '../judgers/isObjectOrArray'

/**
 * @example
 * const hasHello = checkProp('hello', v => Boolean(v))
 * console.log(hasHello({hello: 3})) //=> true
 */
export default function checkProp(
  propName: string | symbol,
  checker: (value: any) => boolean | void
) {
  return (obj) => Boolean(isObjectLike(obj) && checker(obj[propName]))
}
