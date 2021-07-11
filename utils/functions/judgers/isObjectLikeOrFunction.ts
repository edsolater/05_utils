import { AnyFn } from 'typings/constants'
import isFunction from 'utils/functions/judgers/isFunction'
import isObjectLike from 'utils/functions/judgers/isObjectOrArray'

export default function isObjectLikeOrFunction(val: any): val is object | AnyFn {
  return isObjectLike(val) || isFunction(val)
}
