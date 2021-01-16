import isEmptyArray from './isEmptyArray'

/**
 * (纯函数)
 *
 * 判断数组/字符串是否非空
 *
 * @param target 目标数组
 * @example
 * notEmpty([]) // false
 * notEmpty([1]) // true
 */
export default function notEmpty(target: any[] | string): boolean {
  return !isEmptyArray(target)
}
