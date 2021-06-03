import isEmptyArray from './isEmptyArray'
import isEmptyObject from './isEmptyObject'
import isEmptyString from './isEmptyString'

/**
 * 判断目标值是否是空数组或空对象或空字符串
 * @param val 目标值
 */
export default function isEmpty(val: unknown): boolean {
  return isEmptyString(val) || isEmptyArray(val) || isEmptyObject(val)
}
