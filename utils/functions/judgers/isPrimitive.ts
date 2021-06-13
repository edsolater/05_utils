import { Primitive } from 'typings/constants'
import isBoolean from './isBoolean'
import isNumber from './isNumber'
import isString from './isString'

export default function isPrimitive(v: unknown): v is Primitive {
  return isBoolean(v) || isNumber(v) || isString(v)
}
