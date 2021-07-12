import { AnyFn } from 'typings/constants'
import isFunction from './isFunction'
import isObjectLike from './isObjectOrArray'

export default function isObjectLikeOrFunction(val: any): val is object | AnyFn {
  return isObjectLike(val) || isFunction(val)
}
