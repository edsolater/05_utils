import getObjectSize from './getObjectSize'
import isObject from './isObject'

/**
 * 判断对象是否为空
 * @param val 目标对象
 */
export default function isEmptyObject(val: unknown): boolean {
  return isObject(val) && getObjectSize(val) === 0
}
