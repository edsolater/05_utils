import getObjectSize from '../object/getObjectSize'
import isObjectLike from './isObjectLike'

/**
 * 判断对象是否为空
 * @param val 目标对象
 */
export default function isEmptyObject(val: unknown): boolean {
  return isObjectLike(val) && getObjectSize(val) === 0
}
