import isArray from './isArray'

/**
 * 判断数组是否为空
 * @param val 目标数组
 */
export default function isEmptyArray(val: unknown): boolean {
  return isArray(val) && val.length === 0
}