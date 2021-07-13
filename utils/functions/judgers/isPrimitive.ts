import { Primitive } from 'typings/constants'
import isBigInt from './isBigInt'
import isBoolean from './isBoolean'
import isNumber from './isNumber'
import isString from './isString'
import isSymbol from './isSymbol'

export default function isPrimitive(v: unknown): v is Primitive {
  return isBoolean(v) || isNumber(v) || isString(v) || isSymbol(v) || isBigInt(v)
}
